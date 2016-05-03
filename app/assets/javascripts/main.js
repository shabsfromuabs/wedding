$(document).ready(function() {
  var navbar = $('.navbar');

  $(window).scroll(function() {
    if($(window).scrollTop() > 10) {
      navbar.addClass('white');
    }
    else {
      navbar.removeClass('white');
    }
  });
});
