'use strict';

(function () {
  window.mapModule = {
    pinContainer: [],
    pins: ``,
    add: 0,
    addPinsListener() {
      const PIN_CONTAINER = document.querySelector(`.map__pins`);
      this.pins = PIN_CONTAINER.querySelectorAll(`button`);
      this.pins.forEach(function (pinEl, i) {
        if (i !== 0) {
          i = i - window.mapModule.add * 10;
          pinEl.addEventListener(`click`, function () {
            window.cardModule.fillCard(window.dataModule.ads[i - 1]);
            window.cardModule.mainCard.querySelector(`.popup__close`).addEventListener(`mousedown`, window.cardModule.closeCardClick);
            document.addEventListener(`keydown`, window.cardModule.closeCardEsc);
            window.mapModule.add++;
          });
          // TODO: Исправить callback hell
          pinEl.addEventListener(`focus`, function () {
            document.addEventListener(`keydown`, function (e) {
              if (e.key === `Enter`) {
                window.cardModule.fillCard(window.dataModule.ads[i - 1]);
                window.cardModule.mainCard.querySelector(`.popup__close`).addEventListener(`mousedown`, window.cardModule.closeCardClick);
                window.cardModule.mainCard.querySelector(`.popup__close`).addEventListener(`focus`, window.cardModule.closeCardEsc);
                window.mapModule.add++;
              }
            });
          });
        }
      });
    },
    resetAll() {
      window.cardModule.hideCard();
      window.pinModule.resetMain();
      this.pins = ``;
    }
  };
}());
