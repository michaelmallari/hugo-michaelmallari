function UpdatePostsStickyLayout() {
    $('.height-half-width').each(function() {
        $(this).height( $(this).width() * 0.5 );
    });
    $('.height-full-width').each(function() {
        $(this).height( $(this).width() * 1.0 );
    });
    $('.height-onehalf-width').each(function() {
        $(this).height( $(this).width() * 1.5 );
    });
    $('.height-double-width').each(function() {
        $(this).height( $(this).width() * 2.0 );
    });
    $('.height-parent').each(function() {
        $(this).height( $(this).parent().height() );
    });
    $('.post-thumb-arrow').css({
        'margin-top' : function() { return $(this).parent().height() - 16; }
    });


    if ($(window).width() < 375) {
    // alert("Window width < 375");

    }
    if ($(window).width() >= 375) {
    // alert("Window width >= 375");

    }
    if ($(window).width() >= 375 && $(window).width() <= 413) {
    // alert("Window width >= 375 + <= 413");

    }
    if ($(window).width() <= 413) {
    // alert("Window width <= 413");

    }
    if ($(window).width() >= 414) {
    // alert("Window width >= 414");

    }
    if ($(window).width() >= 414 && $(window).width() <= 506) {
    // alert("Window width >= 414 + <= 506");

    }
    if ($(window).width() <= 506) {
    // alert("Window width <= 413");

    }








    if ($(window).width() >= 507) {
    // alert("Window width >= 507");

    }
    if ($(window).width() >= 507 && $(window).width() <= 980) {
        // alert("Window width >= 507 + <= 980");
        $('#posts-sticky > article a .post-details').removeClass('height-auto');
        $('#posts-sticky > article a .post-details').addClass('height-full-width');
        $('#posts-sticky > article:nth-child(3) a .post-details').removeClass('height-full-width');
        $('#posts-sticky > article:nth-child(3) a .post-details').addClass('height-half-width');
    }
    if ($(window).width() >= 507 && $(window).width() <= 550) {
    // alert("Window width >= 507 + <= 550");

    }
    if ($(window).width() <= 550) {
    // alert("Window width <= 550");

    }
    if ($(window).width() >= 551) {
    // alert("Window width >= 551");

    }
    if ($(window).width() >= 551 && $(window).width() <= 677) {
    // alert("Window width >= 551 + <= 677");

    }
    if ($(window).width() <= 677) {
    // alert("Window width <= 677");

    }
    if ($(window).width() >= 678) {
    // alert("Window width >= 678");

    }
    if ($(window).width() >= 678 && $(window).width() <= 767) {
    // alert("Window width >= 678 + <= 767");

    }
    if ($(window).width() <= 767) {
    // alert("Window width <= 767");

    }
    if ($(window).width() >= 768) {
    // alert("Window width >= 768");

    }
    if ($(window).width() >= 768 && $(window).width() <= 980) {
    // alert("Window width >= 768 + <= 980");

    }
    if ($(window).width() >= 768 && $(window).width() <= 819) {
    // alert("Window width >= 768 + <= 819");

    }
    if ($(window).width() <= 819) {
    // alert("Window width <= 819");

    }
    if ($(window).width() >= 820) {
        // alert("Window width >= 820");
    
    }
    if ($(window).width() >= 834 && $(window).width() <= 980) {
    // alert("Window width >= 820 + <= 980");

    }







    if ($(window).width() >= 981) {
    // alert("Window width >= 981");
        $('#posts-sticky > article a .post-details').removeClass('height-auto');
        $('#posts-sticky > article:nth-child(3) a .post-details').removeClass('height-half-width');
        $('#posts-sticky > article:nth-child(5) a .post-details').removeClass('height-full-width');
        $('#posts-sticky > article:nth-child(9) a .post-details').removeClass('height-full-width');

        $('#posts-sticky > article:nth-child(1) a .post-details').addClass('height-full-width');
        $('#posts-sticky > article:nth-child(2) a .post-details').addClass('height-full-width');
        $('#posts-sticky > article:nth-child(3) a .post-details').addClass('height-full-width');
        $('#posts-sticky > article:nth-child(4) a .post-details').addClass('height-onehalf-width');
        $('#posts-sticky > article:nth-child(5) a .post-details').addClass('height-half-width');
        $('#posts-sticky > article:nth-child(6) a .post-details').addClass('height-onehalf-width');
        $('#posts-sticky > article:nth-child(7) a .post-details').addClass('height-onehalf-width');
        $('#posts-sticky > article:nth-child(8) a .post-details').addClass('height-onehalf-width');
        $('#posts-sticky > article:nth-child(9) a .post-details').addClass('height-half-width');
    }
    if ($(window).width() >= 981 && $(window).width() <= 1023) {
    // alert("Window width >= 981 + <= 1199");

    }
    if ($(window).width() <= 1023) {
    // alert("Window width <= 1023");

    }
    if ($(window).width() >= 1024) {
    // alert("Window width >= 1024");

    }
    if ($(window).width() >= 1024 && $(window).width() <= 1111) {
    // alert("Window width >= 1024 + <= 1111");

    }
    if ($(window).width() <= 1111) {
    // alert("Window width <= 1111");

    }
    if ($(window).width() >= 1112) {
    // alert("Window width >= 1112");

    }
    if ($(window).width() >= 1112 && $(window).width() <= 1365) {
    // alert("Window width >= 1112 + <= 1365");

    }
    if ($(window).width() <= 1365) {
    // alert("Window width <= 1365");

    }
    if ($(window).width() >= 1366) {
    // alert("Window width >= 1366");

    }
}








$(document).ready(function() {
    UpdatePostsStickyLayout();
});








$(window).resize(function() {
    UpdatePostsStickyLayout();
}).resize();








$(window).scroll(function() {

});
