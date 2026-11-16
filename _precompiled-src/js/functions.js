/*
 * Site-wide layout and navigation (every page). Plain JavaScript, no jQuery.
 *
 * Also defines window.MM: small DOM helpers shared with posts-sticky.js and
 * posts-category.js, which load after this file.
 *
 * Sizes follow jQuery's conventions so the layout matches the old scripts:
 * - viewport width/height exclude the scrollbar (documentElement.clientWidth);
 * - size()/setSize() work on the content box, as jQuery's .width()/.height() do,
 *   adjusting for box-sizing: border-box.
 */
(() => {
    'use strict';

    const viewportWidth = () => document.documentElement.clientWidth;
    const viewportHeight = () => document.documentElement.clientHeight;
    const px = (n) => `${n}px`;
    const all = (selector) => document.querySelectorAll(selector);

    // Padding + border along one axis
    function boxExtra(style, dimension) {
        const [a, b] = dimension === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
        return parseFloat(style[`padding${a}`]) + parseFloat(style[`padding${b}`])
            + parseFloat(style[`border${a}Width`]) + parseFloat(style[`border${b}Width`]);
    }

    // Content-box width or height (jQuery .width() / .height())
    function size(el, dimension) {
        const style = getComputedStyle(el);
        const extra = boxExtra(style, dimension);
        const value = parseFloat(style[dimension]);
        if (Number.isNaN(value)) {  // e.g. "auto" on an inline element
            return (dimension === 'width' ? el.offsetWidth : el.offsetHeight) - extra;
        }
        return style.boxSizing === 'border-box' ? value - extra : value;
    }

    // Set the content-box width or height (jQuery .width(n) / .height(n))
    function setSize(el, dimension, value) {
        const style = getComputedStyle(el);
        const extra = style.boxSizing === 'border-box' ? boxExtra(style, dimension) : 0;
        el.style[dimension] = px(Math.max(0, value + extra));
    }

    // Border-box height (jQuery .outerHeight())
    const outerHeight = (el) => size(el, 'height') + boxExtra(getComputedStyle(el), 'height');

    // Run fn now if the DOM is parsed, otherwise once it is
    function onReady(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn, { once: true });
        } else {
            fn();
        }
    }

    // Run fn on resize, at most once per animation frame, and again after
    // images and fonts finish loading (they change element heights)
    function onResize(fn) {
        let queued = false;
        window.addEventListener('resize', () => {
            if (queued) return;
            queued = true;
            requestAnimationFrame(() => { queued = false; fn(); });
        });
        window.addEventListener('load', fn);
    }

    // Post cards (home and section pages): heights proportional to width
    function sizePostCards() {
        const ratios = {
            '.height-half-width': 0.5,
            '.height-full-width': 1.0,
            '.height-onehalf-width': 1.5,
            '.height-double-width': 2.0,
        };
        for (const [selector, ratio] of Object.entries(ratios)) {
            all(selector).forEach((el) => setSize(el, 'height', size(el, 'width') * ratio));
        }
        all('.height-parent').forEach((el) => setSize(el, 'height', size(el.parentElement, 'height')));
        all('.post-thumb-arrow').forEach((el) => {
            el.style.marginTop = px(size(el.parentElement, 'height') - 16);
        });
    }

    window.MM = { viewportWidth, viewportHeight, px, all, size, setSize, outerHeight, onReady, onResize, sizePostCards };

    // Off-canvas navigation: full viewport height, parked just off the right edge
    function updateNavPrimary() {
        const nav = document.querySelector('#header #nav');
        if (!nav) return;
        nav.style.minHeight = px(viewportHeight());
        nav.style.right = px(-size(nav, 'width'));
    }

    function updateLayout() {
        const width = viewportWidth();
        const height = viewportHeight();

        all('#board > div').forEach((el) => {
            el.style.gridAutoRows = `minmax(${width * 0.1875}px, auto)`;
        });
        all('.height-full').forEach((el) => { el.style.minHeight = px(height); });
        all('.height-3-4').forEach((el) => { el.style.minHeight = px(height * 0.75); });
        all('.height-half').forEach((el) => { el.style.minHeight = px(height * 0.5); });
        all('.grid-rectangle').forEach((el) => setSize(el, 'height', size(el, 'width')));

        const pageContainer = document.querySelector('#page-container');
        if (pageContainer) {
            all('.container-1-4-width').forEach((el) => setSize(el, 'width', size(pageContainer, 'width') * 0.25));
        }
        all('.vertical-middle').forEach((el) => {
            el.style.marginTop = px((outerHeight(el.parentElement) - outerHeight(el)) / 2);
        });
        all('.vertical-bottom').forEach((el) => { el.style.bottom = px(-outerHeight(el)); });

        if (width >= 981) {
            const aside = document.querySelector('#aside');
            const content = document.querySelector('#content');
            const masthead = document.querySelector('#masthead');
            if (aside && content) aside.style.width = px(size(content, 'width') * 0.25);
            if (aside && masthead) aside.style.top = px(outerHeight(masthead) * 0.88);
        }

        const navInner = document.querySelector('#nav > div');
        if (width <= 1111) {
            if (navInner) navInner.classList.add('container');
            updateNavPrimary();
        } else if (navInner) {
            navInner.classList.remove('container');
        }
    }

    // The banner slides in once the reader has scrolled past the masthead
    function onScroll() {
        const width = viewportWidth();
        const banner = document.querySelector('#banner');
        if (banner) {
            const threshold = width <= 677 ? 800 : 1200;
            banner.classList.toggle('expanded', window.scrollY > threshold);
        }
        if (width <= 1111) updateNavPrimary();
    }

    onReady(() => {
        all('.toggle-hamburger-menu').forEach((button) => {
            button.addEventListener('click', () => {
                document.querySelector('#header #nav')?.classList.toggle('expanded');
                document.querySelector('#hamburger-menu')?.classList.toggle('toggle-hamburger-menu-close');
            });
        });
        updateLayout();
    });
    onResize(updateLayout);
    window.addEventListener('scroll', onScroll, { passive: true });
})();
