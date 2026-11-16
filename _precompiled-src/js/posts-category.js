/*
 * Section page post cards (.posts-list). Plain JavaScript, no jQuery.
 * Uses the window.MM helpers from functions.js, which loads first.
 *
 * Up to 506px, cards take their natural height. From 507px up, every card is
 * square.
 */
(() => {
    'use strict';

    const { viewportWidth, all, onReady, onResize, sizePostCards } = window.MM;

    const details = () => all('.posts-list > article a .post-details');
    const add = (...cls) => details().forEach((el) => el.classList.add(...cls));
    const remove = (...cls) => details().forEach((el) => el.classList.remove(...cls));

    function updatePostsCategoryLayout() {
        const width = viewportWidth();

        if (width <= 506) {
            remove('height-half-width', 'height-full-width', 'height-onehalf-width', 'height-double-width');
            add('height-auto');
        }
        if (width >= 507 && width <= 980) {
            remove('height-auto');
            add('height-full-width');
        }
        if (width <= 980) {
            remove('height-onehalf-width', 'height-half-width');
        }
        if (width >= 981) {
            remove('height-auto');
            add('height-full-width');
        }

        // Size after the classes are set, so the first paint is already right
        sizePostCards();
    }

    window.UpdatePostsCategoryLayout = updatePostsCategoryLayout;
    onReady(updatePostsCategoryLayout);
    onResize(updatePostsCategoryLayout);
})();
