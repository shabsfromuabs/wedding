var navbar = $('.navbar');

function setNavBarClass() {
  if ($(window).scrollTop() > 10) {
    navbar.addClass('white');
  }
  else {
    navbar.removeClass('white');
  }
}
