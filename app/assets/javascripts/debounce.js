function debounce(func, delay) {
  var timeout;

  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(func, delay);
  }
}
