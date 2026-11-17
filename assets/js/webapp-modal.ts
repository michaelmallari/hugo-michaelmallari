/**
 * Web app modal: the nearly full-screen dialog that signs a reader in and
 * then hands over to the post's web app.
 *
 *   button.webapp-open  (shortcode `webapp`)
 *     → <dialog> opens → MSAL.js loads (lazily, pinned + SRI)
 *     → not signed in?  sign-in screen → popup (Entra External ID)
 *     → GET {apiBaseUrl}/me → pending | rejected | approved
 *     → approved: import({apiBaseUrl}/app/{slug}.js) and call its mount()
 *
 * Web app contract (served by the backend):
 *   export function mount(el: HTMLElement, ctx: WebAppContext):
 *     void | (() => void) | Promise<void | (() => void)>   // optional unmount
 *
 * Design: adr/0001-webapp-login-and-modal.md in michaelmallari-github-io.
 * Compiled by Hugo's js.Build (esbuild): types are stripped, not checked.
 */
import * as params from "@params";

interface Provider {
  label: string;
  domainHint: string; // "" = show Entra's own sign-in page
}

interface Config {
  tenantSubdomain: string;
  clientId: string;
  apiScope: string;
  apiBaseUrl: string;
  redirectUri: string;
  providers: Provider[];
}

interface Me {
  name: string | null;
  email: string | null;
  status: "pending" | "approved" | "rejected";
}

export interface WebAppContext {
  slug: string;
  user: Me;
  apiBaseUrl: string;
  /** A fresh access token for the backend (renewed silently by MSAL). */
  getToken: () => Promise<string>;
}

type Unmount = () => void;

// MSAL.js is loaded from a CDN on first use, so pages that never open the
// modal don't pay for it. Bump the version and the hash together:
//   curl -s <url> | openssl dgst -sha384 -binary | openssl base64 -A
const MSAL_SRC = "https://cdn.jsdelivr.net/npm/@azure/msal-browser@4.30.0/lib/msal-browser.min.js";
const MSAL_SRI = "sha384-RGxxfG5yRS8DLU7ZJ8OoLhbV/BsJFHyPuMVHrTLbpj3t5Z15LnviJmaznKY/a7LZ";

const cfg = params as unknown as Config;
const scopes = [cfg.apiScope];

// Minimal shape of the MSAL APIs we use (the CDN build has no types here).
interface Account { name?: string; username: string }
interface AuthResult { account: Account; accessToken: string }
interface Pca {
  initialize(): Promise<void>;
  getActiveAccount(): Account | null;
  getAllAccounts(): Account[];
  setActiveAccount(a: Account | null): void;
  loginPopup(req: object): Promise<AuthResult>;
  acquireTokenSilent(req: object): Promise<AuthResult>;
  logoutPopup(req: object): Promise<void>;
  clearCache(): Promise<void>;
}

class SignInRequired extends Error {}

/* ------------------------------------------------------------------ MSAL */

let pcaPromise: Promise<Pca> | null = null;

function getPca(): Promise<Pca> {
  if (!pcaPromise) {
    pcaPromise = new Promise<any>((resolve, reject) => {
      const s = document.createElement("script");
      s.src = MSAL_SRC;
      s.integrity = MSAL_SRI;
      s.crossOrigin = "anonymous";
      s.onload = () => resolve((window as any).msal);
      s.onerror = () => reject(new Error("The sign-in library couldn't be loaded. Check your connection and try again."));
      document.head.appendChild(s);
    }).then(async (msal) => {
      const pca: Pca = new msal.PublicClientApplication({
        auth: {
          clientId: cfg.clientId,
          authority: `https://${cfg.tenantSubdomain}.ciamlogin.com/`,
          redirectUri: cfg.redirectUri,
          postLogoutRedirectUri: cfg.redirectUri,
        },
        cache: { cacheLocation: "sessionStorage" },
      });
      await pca.initialize();
      return pca;
    });
    pcaPromise.catch(() => { pcaPromise = null; }); // allow a retry
  }
  return pcaPromise;
}

function account(pca: Pca): Account | null {
  const a = pca.getActiveAccount() ?? pca.getAllAccounts()[0] ?? null;
  if (a) pca.setActiveAccount(a);
  return a;
}

async function getToken(pca: Pca): Promise<string> {
  const a = account(pca);
  if (!a) throw new SignInRequired();
  try {
    return (await pca.acquireTokenSilent({ scopes, account: a })).accessToken;
  } catch {
    // Typically the 24-hour SPA refresh-token limit: needs a popup again.
    throw new SignInRequired();
  }
}

/* ------------------------------------------------------------------ DOM */

function h<K extends keyof HTMLElementTagNameMap>(
  tag: K, attrs: Record<string, string> = {}, ...children: (Node | string)[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  el.append(...children); // strings become text nodes: never parsed as HTML
  return el;
}

let dialog: HTMLDialogElement;
let titleEl: HTMLElement;
let accountEl: HTMLElement;
let accountName: HTMLElement;
let panel: HTMLElement;
let appEl: HTMLElement;

let current: { slug: string; trigger: HTMLElement; unmount: Unmount | null } | null = null;
let run = 0; // bumped on close / restart so stale async work stops touching the DOM

function buildDialog(): void {
  if (dialog) return;
  titleEl = h("h2", { id: "webapp-modal-title", class: "webapp-modal__title" });
  accountName = h("span", { class: "webapp-modal__account-name" });
  const signOut = h("button", { type: "button", class: "webapp-modal__link" }, "Sign out");
  signOut.addEventListener("click", onSignOut);
  accountEl = h("div", { class: "webapp-modal__account" }, accountName, signOut);
  accountEl.hidden = true;
  const close = h("button", { type: "button", class: "webapp-modal__close", "aria-label": "Close" }, "×");
  close.addEventListener("click", () => dialog.close());

  panel = h("div", { class: "webapp-modal__panel", "aria-live": "polite" });
  appEl = h("div", { class: "webapp-modal__app" });
  appEl.hidden = true;

  dialog = h("dialog", { class: "webapp-modal", "aria-labelledby": "webapp-modal-title" },
    h("header", { class: "webapp-modal__bar" }, titleEl, accountEl, close),
    h("div", { class: "webapp-modal__body" }, panel, appEl),
  );
  // Click on the backdrop (outside the dialog box) closes it.
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener("close", onClose);
  document.body.appendChild(dialog);
}

function showPanel(...children: (Node | string)[]): void {
  appEl.hidden = true;
  panel.hidden = false;
  panel.replaceChildren(h("div", { class: "webapp-modal__card" }, ...children));
}

function showAccount(me: Me | null): void {
  accountEl.hidden = !me;
  accountName.textContent = me ? (me.name || me.email || "Signed in") : "";
}

function button(label: string, onClick: () => void, primary = true): HTMLButtonElement {
  const b = h("button", { type: "button", class: primary ? "webapp-modal__btn" : "webapp-modal__btn webapp-modal__btn--secondary" }, label);
  b.addEventListener("click", onClick);
  return b;
}

/* --------------------------------------------------------------- screens */

function renderLoading(message: string): void {
  showPanel(h("div", { class: "webapp-modal__spinner", "aria-hidden": "true" }), h("p", {}, message));
}

function renderError(message: string): void {
  showPanel(
    h("h3", {}, "Something went wrong"),
    h("p", {}, message),
    button("Try again", () => start()),
  );
}

function renderSignIn(pca: Pca, note = ""): void {
  showAccount(null);
  const buttons = cfg.providers.map((p) => button(p.label, () => signIn(pca, p)));
  showPanel(
    h("h3", {}, "Sign in to explore"),
    h("p", {}, "This interactive version needs a free account. New accounts are reviewed before access is granted."),
    ...(note ? [h("p", { class: "webapp-modal__note" }, note)] : []),
    h("div", { class: "webapp-modal__actions" }, ...buttons),
    h("p", { class: "webapp-modal__fine" }, "Sign-in opens a small Microsoft window and returns you here."),
  );
}

function renderPending(me: Me): void {
  showPanel(
    h("h3", {}, "Awaiting approval"),
    h("p", {}, `Thanks${me.name ? `, ${me.name}` : ""}. Your account is waiting for approval. Once it's approved, you'll be able to explore the interactive version here.`),
    button("Check again", () => start(), false),
  );
}

function renderRejected(): void {
  showPanel(
    h("h3", {}, "Access not available"),
    h("p", {}, "This account hasn't been approved for the interactive versions."),
  );
}

/* ------------------------------------------------------------------ flow */

async function start(): Promise<void> {
  const myRun = ++run;
  renderLoading("Checking sign-in…");
  let pca: Pca;
  try {
    pca = await getPca();
  } catch (e) {
    if (myRun === run) renderError((e as Error).message);
    return;
  }
  if (myRun !== run) return;
  if (!account(pca)) return renderSignIn(pca);
  await afterSignIn(pca, myRun);
}

function signIn(pca: Pca, p: Provider): void {
  // Called straight from the click so the popup isn't blocked.
  const req: Record<string, unknown> = { scopes };
  if (p.domainHint) req.extraQueryParameters = { domain_hint: p.domainHint };
  const myRun = ++run;
  const popup = pca.loginPopup(req);
  renderLoading("Finish signing in in the pop-up window…");
  popup
    .then((r) => { pca.setActiveAccount(r.account); return afterSignIn(pca, myRun); })
    .catch((e) => {
      if (myRun !== run) return;
      const code = (e && e.errorCode) || "";
      if (code === "user_cancelled") return renderSignIn(pca);
      if (code === "popup_window_error" || code === "empty_window_error")
        return renderSignIn(pca, "Your browser blocked the sign-in window. Allow pop-ups for this site, then try again.");
      console.error("[webapp] sign-in failed", e);
      // MSAL's errorMessage starts with Entra's "AADSTSnnnnn: …" reason when there is one.
      const aadsts = String(e?.errorMessage || e?.message || "").match(/AADSTS\d+[^\r\n]*/)?.[0];
      renderSignIn(pca, `Sign-in didn't complete (${[code, aadsts].filter(Boolean).join(": ") || "unknown error"}). Please try again.`);
    });
}

async function api(pca: Pca, path: string): Promise<Response> {
  const token = await getToken(pca);
  return fetch(cfg.apiBaseUrl + path, { headers: { Authorization: `Bearer ${token}` } });
}

async function afterSignIn(pca: Pca, myRun: number): Promise<void> {
  if (myRun !== run) return;
  renderLoading("Checking your access…");
  let me: Me;
  try {
    const r = await api(pca, "/me");
    if (myRun !== run) return;
    if (r.status === 401) return renderSignIn(pca, "Your session has expired. Please sign in again.");
    if (!r.ok) throw new Error(`The server responded with ${r.status}.`);
    me = await r.json();
  } catch (e) {
    if (myRun !== run) return;
    if (e instanceof SignInRequired) return renderSignIn(pca, "Your session has expired. Please sign in again.");
    return renderError(e instanceof TypeError
      ? "The server couldn't be reached. Please try again in a moment."
      : (e as Error).message);
  }
  if (myRun !== run) return;
  showAccount(me);
  if (me.status === "approved") return mountApp(pca, me, myRun);
  if (me.status === "rejected") return renderRejected();
  return renderPending(me);
}

async function mountApp(pca: Pca, me: Me, myRun: number): Promise<void> {
  if (!current) return;
  renderLoading("Loading…");
  const slug = current.slug;
  try {
    const url = `${cfg.apiBaseUrl}/app/${encodeURIComponent(slug)}.js`;
    const mod = await import(/* @vite-ignore */ url);
    if (myRun !== run || !current) return;
    if (typeof mod.mount !== "function") throw new Error("This web app is missing its mount() function.");
    panel.hidden = true;
    appEl.hidden = false;
    appEl.replaceChildren();
    const ctx: WebAppContext = { slug, user: me, apiBaseUrl: cfg.apiBaseUrl, getToken: () => getToken(pca) };
    const unmount = await mod.mount(appEl, ctx);
    if (myRun !== run) { if (typeof unmount === "function") unmount(); return; }
    current.unmount = typeof unmount === "function" ? unmount : null;
  } catch (e) {
    if (myRun !== run) return;
    console.error("[webapp]", e);
    renderError(`The interactive version couldn't be loaded. ${(e as Error).message || ""}`.trim());
  }
}

async function onSignOut(): Promise<void> {
  const pca = await getPca();
  const a = account(pca);
  run++;
  renderLoading("Signing out…");
  try {
    // Ends the Entra session too, so the next sign-in asks for a new code.
    if (a) await pca.logoutPopup({ account: a });
  } catch {
    await pca.clearCache(); // popup blocked/closed: at least forget tokens here
  }
  pca.setActiveAccount(null);
  if (current) { current.unmount?.(); current.unmount = null; }
  appEl.replaceChildren();
  renderSignIn(pca);
}

/* ------------------------------------------------------------ open/close */

function open(trigger: HTMLElement): void {
  buildDialog();
  current = { slug: trigger.dataset.webappSlug || "", trigger, unmount: null };
  titleEl.textContent = trigger.dataset.webappTitle || document.title;
  document.documentElement.classList.add("webapp-modal-open");
  dialog.showModal();
  start();
}

function onClose(): void {
  run++;
  try { current?.unmount?.(); } catch (e) { console.error("[webapp] unmount", e); }
  appEl.replaceChildren();
  appEl.hidden = true;
  document.documentElement.classList.remove("webapp-modal-open");
  current?.trigger.focus();
  current = null;
}

document.addEventListener("click", (e) => {
  const trigger = (e.target as Element | null)?.closest<HTMLElement>(".webapp-open");
  if (!trigger) return;
  e.preventDefault();
  open(trigger);
});
