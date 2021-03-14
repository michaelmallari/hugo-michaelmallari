function UpdateNavPrimary() {
  $('#header #nav').css({
    'min-height' : function() { return $(window).height() * 1.0; }
  });
  $('#header #nav').css({
    'right' : function() { return -$("header #nav").width(); }
  });
}


function UpdateLayout() {
  $('#board > div').css({
    // grid-auto-rows: minmax(200px, auto);
    'grid-auto-rows' : function() {
      return ('minmax(' + $(window).width() * 0.1875 + 'px, auto)');
    }
  });
  $('.height-full').css({
    'min-height' : function() { return $(window).height() * 1.0; }
  });
  $('.height-3-4').css({
    'min-height' : function() { return $(window).height() * 0.75; }
  });
  $('.height-half').css({
    'min-height' : function() { return $(window).height() * 0.5; }
  });
  $('.grid-rectangle').each(function() {
    $(this).height( $(this).width() * 1.0 );
  });
  $('.container-1-4-width').each(function() {
    $(this).width( $('#page-container').width() * 0.25 );
  });
  $('.vertical-middle').css({
    'margin-top' : function() { return ( $(this).parent().outerHeight() - $(this).outerHeight() ) / 2 ; }  // ( Parent height - child height) / 2
  });
  $('.vertical-bottom').css({
    'bottom' : function() { return -$(this).outerHeight(); }
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

  }
  if ($(window).width() >= 768) {
  // alert("Window width >= 768");

  }
  if ($(window).width() >= 768 && $(window).width() <= 991) {
  // alert("Window width >= 768 + <= 991");

  }
  if ($(window).width() <= 991) {
  // alert("Window width <= 991");

  }
  if ($(window).width() >= 992) {
  // alert("Window width >= 992");
    $('#aside').css({
      'width' : function() { return $("#content").width() * 0.25; },
      'top' : function() { return $("#masthead").outerHeight() * 0.88; }
    });
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
    $('#nav > div').addClass('container');
    UpdateNavPrimary();
  }
  if ($(window).width() >= 1200) {
  // alert("Window width >= 1200");
    $('#nav > div').removeClass('container');
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
  $('.toggle-hamburger-menu').click(function() {
    // $('body').toggleClass('disable-scroll');
    // $('#page-container').toggleClass('disable-scroll');
    $('#header #nav').toggleClass('expanded');
    $('#hamburger-menu').toggleClass('toggle-hamburger-menu-close');
  });

  UpdateLayout();
});








$(window).resize(function() {
  UpdateLayout();
}).resize();








$(window).scroll(function() {

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

  }
  if ($(window).width() >= 768) {
  // alert("Window width >= 768");

  }
  if ($(window).width() >= 768 && $(window).width() <= 991) {
  // alert("Window width >= 768 + <= 991");

  }
  if ($(window).width() <= 991) {
  // alert("Window width <= 991");

  }
  if ($(window).width() >= 992) {
  // alert("Window width >= 992");

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
    UpdateNavPrimary();
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
});
