'use strict';

(function () {
  const FORM = document.querySelector(`.ad-form`);
  const MAIN_PIN = document.querySelector(`.map__pin--main`);
  window.utilModule = {
    PIN_WIDTH: 40,
    MAIN_PIN_AFTER_HEIGHT: 22,
    isReset: false,
    StatusCode: {
      OK: 200,
      PAGE_NOT_FOUND: 404,
      FORBIDDEN: 500,
      INTERNAL_SERVER: 500,
      TIMEOUT: 0
    },
    FILE_TYPES: [`gif`, `jpg`, `jpeg`, `png`],
    setAddress() {
      FORM.querySelector(`#address`).value = `${Math.trunc(MAIN_PIN.offsetLeft) + Math.trunc(MAIN_PIN.clientWidth / 2)},${MAIN_PIN.offsetTop + MAIN_PIN.clientHeight + this.MAIN_PIN_AFTER_HEIGHT}`;
    }
  };

})();
