var win = $(window);

win.load(function () {
  //$('#cover-video')[0].play();
});

$(document).ready(function () {
  fitVideoContainer();
  win.scroll(setNavBarClass);
  win.resize(debounce(fitVideoContainer, 100));
});
