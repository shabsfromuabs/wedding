$(function() {
  var targetDate = new Date(2016, 7 - 1, 23);
  var target = targetDate.getTime();
  var currentDate = new Date();
  var current = currentDate.getTime();
  var diff = target - current;
  var daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

  var countdownWrap = $('.countdown');

  if (daysLeft > 0) {
    countdownWrap.find('.feature').show();
  }
  else if (daysLeft === 0) {
    countdownWrap.find('.today').show();
  }
  else if (daysLeft < 0) {
    countdownWrap.find('.past').show();
  }

  if (daysLeft !== 0) {
    var absDays = Math.abs(daysLeft);
    var lastDigit = absDays % 10;
    var daysSuffix;

    if (absDays >= 11 && absDays <= 19) daysSuffix = 'днів';
    else if (lastDigit === 1) daysSuffix = 'день';
    else if ([2, 3, 4].indexOf(lastDigit) >= 0) daysSuffix = 'дні';
    else daysSuffix = 'днів';

    countdownWrap.find('.days.count').text(absDays).show();
    countdownWrap.find('.days.suffix').text(daysSuffix).show();
  }
  else {
    countdownWrap.find('.days.count').text('Сьогодні!').show();
  }
});
