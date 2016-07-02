$(function () {
  $('a.scroll-link').click(function () {
    var targetElement = $($(this).attr('href'));
    $('html, body').stop().animate({scrollTop: targetElement.length ? targetElement.offset().top - 90 : 0});
    return false;
  });
});
