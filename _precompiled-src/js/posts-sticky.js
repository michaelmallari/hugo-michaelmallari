/*
 * Home page post cards (#posts-sticky). Plain JavaScript, no jQuery.
 * Uses the window.MM helpers from functions.js, which loads first.
 *
 * Between 507px and 980px every card is square, except the third, which is
 * half height. From 981px up, the first nine cards get a mosaic of heights.
 */
(() => {
    'use strict';

    const { viewportWidth, all, onReady, onResize, sizePostCards } = window.MM;

    const details = (n) => all(`#posts-sticky > article${n ? `:nth-child(${n})` : ''} a .post-details`);
    const add = (n, cls) => details(n).forEach((el) => el.classList.add(cls));
    const remove = (n, cls) => details(n).forEach((el) => el.classList.remove(cls));

    function updatePostsStickyLayout() {
        const width = viewportWidth();

        if (width >= 507 && width <= 980) {
            remove(null, 'height-auto');
            add(null, 'height-full-width');
            remove(3, 'height-full-width');
            add(3, 'height-half-width');
        }
        if (width >= 981) {
            remove(null, 'height-auto');
            remove(3, 'height-half-width');
            remove(5, 'height-full-width');
            remove(9, 'height-full-width');
            [1, 2, 3].forEach((n) => add(n, 'height-full-width'));
            [4, 6, 7, 8].forEach((n) => add(n, 'height-onehalf-width'));
            [5, 9].forEach((n) => add(n, 'height-half-width'));
        }

        // Size after the classes are set, so the first paint is already right
        sizePostCards();
    }

    window.UpdatePostsStickyLayout = updatePostsStickyLayout;
    onReady(updatePostsStickyLayout);
    onResize(updatePostsStickyLayout);
})();
