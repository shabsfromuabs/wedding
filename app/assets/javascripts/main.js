var win = $(window);

win.load(function () {
  if(win.width() >= 768) {
    $('#cover-video')[0].play();
  }
});

$(function () {
  fitVideoContainer();
  setNavBarClass();

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

  $('.toggle-video').click(function() {
    var video = $('#cover-video')[0];
    if (!!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2)) {
      video.pause();
      $(this).removeClass('pause').addClass('play');
    }
    else {
      video.play();
      $(this).removeClass('play').addClass('pause');
    }
  });
});
