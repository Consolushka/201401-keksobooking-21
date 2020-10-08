'use strict';

(function () {
  window.utilModule = {START_CHECKIN: 12,
    OCLOCK: `:00`,
    PIN_WIDTH: 40,
    PIN_LOCATION_Y_START: 130,
    MAIN_PIN_AFTER_WIDTH: 10,
    MAIN_PIN_AFTER_HEIGHT: 22,
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    getRandomArr(arr, plotArr, length, max) {
      let item = this.getRandomInt(max);
      if (arr.length < length) {
        if (!arr.includes(plotArr[item])) {
          arr.push(plotArr[item]);
        }
        this.getRandomArr(arr, plotArr, length, max);
      }
      return arr;
    }
  };
}());
