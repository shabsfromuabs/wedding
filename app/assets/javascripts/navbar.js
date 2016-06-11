var navbar = $('.navbar');

function setNavBarClass() {
  if ($(window).scrollTop() > 100) {
    navbar.addClass('white');
  }
  else {
    navbar.removeClass('white');
  }
}
