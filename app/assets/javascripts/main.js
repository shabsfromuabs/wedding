var win = $(window);

$(function () {
  fitVideoContainer();
  setNavBarClass();
  setVideoPlayback();

  win.resize(debounce(fitVideoContainer, 100));
  win.scroll(setNavBarClass);

  $('.scroll-down').click(function () {
    var topSection = $('.jumbotron.top-section');
    $('html, body').stop().animate({scrollTop: topSection.outerHeight() - 70});
  });

  $('a.scroll-link').click(function () {
    var targetElement = $($(this).attr('href'));
    $('html, body').stop().animate({scrollTop: targetElement.length ? targetElement.offset().top - 90 : 0});
    return false;
  });
});
