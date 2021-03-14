function UpdatePostsCategoryLayout() {
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
    $('#posts-category > article a .post-details').removeClass('height-full-width');
    $('#posts-category > article a .post-details').addClass('height-auto');
  }
  if ($(window).width() >= 768) {
  // alert("Window width >= 768");

  }
  if ($(window).width() >= 768 && $(window).width() <= 991) {
  // alert("Window width >= 768 + <= 991");
    $('#posts-category > article a .post-details').removeClass('height-auto');
    $('#posts-category > article a .post-details').addClass('height-full-width');
  }
  if ($(window).width() <= 991) {
  // alert("Window width <= 991");
    $('#posts-category > article a .post-details').removeClass('height-full-width');
    $('#posts-category > article a .post-details').removeClass('height-onehalf-width');
    $('#posts-category > article a .post-details').removeClass('height-half-width');
  }
  if ($(window).width() >= 992) {
  // alert("Window width >= 992");
    $('#posts-category > article a .post-details').removeClass('height-auto');

    $('#posts-category > article a .post-details').addClass('height-full-width');
  }
  if ($(window).width() >= 992 && $(window).width() <= 1023) {
  // alert("Window width >= 992 + <= 1199");

  }
  if ($(window).width() <= 1023) {
  // alert("Window width <= 1023");

  }
  if ($(window).width() >= 1024) {
  // alert("Window width >= 1024");

  }
  if ($(window).width() >= 1024 && $(window).width() <= 1199) {
  // alert("Window width >= 1024 + <= 1199");

  }
  if ($(window).width() <= 1199) {
  // alert("Window width <= 1199");

  }
  if ($(window).width() >= 1200) {
  // alert("Window width >= 1200");

  }
  if ($(window).width() >= 1200 && $(window).width() <= 1399) {
  // alert("Window width >= 1200 + <= 1399");

  }
  if ($(window).width() <= 1399) {
  // alert("Window width <= 1399");

  }
  if ($(window).width() >= 1400) {
  // alert("Window width >= 1400");

  }
}








$(document).ready(function() {
  UpdatePostsCategoryLayout();
});








$(window).resize(function() {
  UpdatePostsCategoryLayout();
}).resize();








$(window).scroll(function() {

});
