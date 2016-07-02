$(function () {
  var win = $(window);
  var navbar = $('.navbar');

  setNavBarClass();
  win.scroll(setNavBarClass);

  function setNavBarClass() {
    if ($(window).scrollTop() > 100) {
      navbar.addClass('white');
    }
    else {
      navbar.removeClass('white');
    }
  }
});
