var topSection = $('.jumbotron.top-section');
var topSectionContainer = topSection.find('.container');

function fitVideoContainer() {
  // If middle or large screen
  if (win.width() >= 992) {
    var videoSectionHeight = win.height();
    // If such height does not allow to fill video section by height
    if (videoSectionHeight / win.width() > 720 / 1280) {
      // Decrease video section height to match aspect ratio
      videoSectionHeight = win.width() * 720 / 1280;
    }
    // Calculate padding to
    var padding = (videoSectionHeight - topSectionContainer.height()) / 2;
    topSection.css({paddingTop: padding, paddingBottom: padding});
  }
}
