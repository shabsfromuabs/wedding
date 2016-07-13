$(function () {
  var win = $(window);
  var topSection = $('.jumbotron.top-section');
  var topSectionContainer = topSection.find('.container');
  var video = $('#cover-video')[0];
  var videoToggle = $('.toggle-video-playback');

  fitVideoContainer();
  setVideoPlayback();

  win.load(fitVideoContainer);
  win.resize(debounce(fitVideoContainer, 100));

  $('.scroll-down').click(function () {
    $('html, body').stop().animate({scrollTop: topSection.outerHeight() - 70});
  });

  function fitVideoContainer() {
    // Unless xs screen
    if (win.width() >= 768) {
      // Set video section equal to window height
      var videoSectionHeight = win.height();
      // If such height does not allow to fill video section by height
      if (videoSectionHeight / win.width() > 720 / 1280) {
        // Decrease video section height to match aspect ratio
        videoSectionHeight = win.width() * 720 / 1280;
      }
      // Calculate padding
      var padding = (videoSectionHeight - topSectionContainer.height()) / 2;
      topSection.css({paddingTop: padding, paddingBottom: padding});
    }
    else {
      topSection.css({paddingTop: 70, paddingBottom: 70});
    }
  }

  function setVideoPlayback() {
    setVideoToggleClass('play');

    $(window).load(function () {
      if (win.width() >= 768) {
        video.play();
        setVideoToggleClass('pause');
      }
      else {
        video.src = '/uploads/video_360p.mp4';
      }
    });

    videoToggle.click(function () {
      if (!!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2)) {
        video.pause();
        setVideoToggleClass('play');
      }
      else {
        video.play();
        setVideoToggleClass('pause');
      }
    });

    function setVideoToggleClass(cssClass) {
      videoToggle.removeClass('pause play').addClass(cssClass);
    }
  }
});
