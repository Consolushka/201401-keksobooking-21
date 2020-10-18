'use strict';

(function () {
  let DEBOUNCE_INTERVAL = 300; // ms

  window.debounce = function () {
    let lastTimeout = null;

    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
