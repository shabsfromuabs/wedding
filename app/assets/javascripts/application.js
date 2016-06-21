//= require_tree .

$(function() {

});

var createLink = function (link) {
  var l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = link;
  document.head.appendChild(l);
};
var registerLink = function (link) {
  var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;
  raf ? raf(function () {
    createLink(link);
  }) : window.addEventListener('load', function () {
    createLink(link);
  });
};

window.onload = function () {
  registerLink('//fonts.googleapis.com/css?family=RobotoDraft:100,300,400,500,700');
  registerLink('//maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css');
};
