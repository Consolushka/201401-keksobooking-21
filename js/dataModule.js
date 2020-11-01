'use strict';

const ERROR_POPUP = document.querySelector(`.popup--error`);
const onCloseClick = ()=> {
  ERROR_POPUP.classList.add(`popup--hidden`);
  ERROR_POPUP.querySelector(`.popup__close`).removeEventListener(`click`, onCloseClick);
};
window.dataModule = {
  ads: [],
  countOfAds: 5,
  newAds: [],
  roomTypeTranslator: {
    PALACE: `Дворец`,
    FLAT: `Квартира`,
    HOUSE: `Дом`,
    BUNGALOW: `Бунгало`
  },
  fillOffers() {
    window.loadModule.send(`get`, ``, window.dataModule.load, window.dataModule.error);
  },
  load(loadedAds) {
    for (let i = 0; i <= loadedAds.length - 1; i++) {
      window.dataModule.ads.push(loadedAds[i]);
    }
    window.dataModule.ads.forEach((ad)=> {
      ad[`matched`] = 0;
      ad[`matches`] = {
        features: []
      };
    });
    window.pinModule.load(window.dataModule.countOfAds, window.dataModule.ads);
  },
  error(errorText) {
    ERROR_POPUP.querySelector(`.popup__text`).textContent = errorText;
    ERROR_POPUP.classList.remove(`popup--hidden`);
    ERROR_POPUP.querySelector(`.popup__close`).addEventListener(`click`, onCloseClick);
  }
};
