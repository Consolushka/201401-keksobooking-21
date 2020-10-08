'use strict';

(function () {
  window.mapModule = {
    addPinsListener() {
      const PIN_CONTAINER = document.querySelector(`.map__pins`);
      let pins = PIN_CONTAINER.querySelectorAll(`button`);
      pins.forEach(function (pinEl, i) {
        if (i !== 0) {
          pinEl.addEventListener(`click`, function () {
            window.cardModule.fillCard(window.dataModule.ads[i - 1]);
            window.cardModule.mainCard.querySelector(`.popup__close`).addEventListener(`mousedown`, window.cardModule.closeCardClick);
            document.addEventListener(`keydown`, window.cardModule.closeCardEsc);
          });
          pinEl.addEventListener(`focus`, function () {
            document.addEventListener(`keydown`, function (e) {
              if (e.key === `Enter`) {
                window.cardModule.fillCard(window.dataModule.ads[i - 1]);
                window.cardModule.mainCard.querySelector(`.popup__close`).addEventListener(`mousedown`, window.cardModule.closeCardClick);
                window.cardModule.mainCard.querySelector(`.popup__close`).addEventListener(`focus`, window.cardModule.closeCardEsc);
              }
            });
          });
        }
      });
    }
  };
}());
