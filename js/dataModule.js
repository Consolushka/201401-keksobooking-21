'use strict';

(function () {

  const ERROR_POPUP = document.querySelector(`.popup--error`);
  window.dataModule = {
    ads: [],
    ROOM_TYPE: [`palace`, `flat`, `house`, `bungalow`],
    ROOM_TYPE_TRANSLATER: {
      palace: `Дворец`,
      flat: `Квартира`,
      house: `Дом`,
      bungalow: `Бунгало`
    },
    FEATURES_LIST: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
    PHOTOS_LIST: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
    fillOffers() {
      window.loadModule(window.dataModule.loading, window.dataModule.error);
    },
    loading(loadedAds) {
      for (let i = 0; i <= loadedAds.length - 1; i++) {
        window.dataModule.ads.push(loadedAds[i]);
      }
      window.dataModule.ads.forEach(function (ad) {
        ad[`matched`] = 0;
        ad[`matches`] = {
          features: []
        };
      });
      window.pinModule.loadPins(5);
    },
    error(errorText) {
      ERROR_POPUP.querySelector(`.popup__text`).textContent = errorText;
      ERROR_POPUP.classList.remove(`popup--hidden`);
      ERROR_POPUP.querySelector(`.popup__close`).addEventListener(`click`, function () {
        ERROR_POPUP.classList.remove(`popup--hidden`);
      });
    }
  };
}());
