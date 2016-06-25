function setVideoPlayback () {
  var video = $('#cover-video')[0];
  var videoToggle = $('.toggle-video-playback');

  setVideoToggleClass('play');

  $(window).load(function () {
    if(win.width() >= 768) {
      //$('#cover-video')[0].play();
      //setVideoToggleClass('pause');
    }
  });

  videoToggle.click(function() {
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
