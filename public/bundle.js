/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!**************************!*\
  !*** ./js/cardModule.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


let featuresWrapper;
let photosWrapper;
const CARD_TEMPLATE = document.querySelector(`#card`).content.querySelector(`.map__card`);
const CARD_PHOTO_TEMPLATE = document.querySelector(`#card`).content.querySelector(`.popup__photo`);

window.cardModule = {
  mainCard: document.querySelector(`.map__card`),
  fill(index) {
    this.create();
    let ad = window.dataModule.ads[index];
    this.mainCard.querySelector(`.popup__photos`).innerHTML = ``;
    this.mainCard.removeAttribute(`style`);
    this.mainCard.querySelector(`.popup__title`).textContent = ad.offer.title;
    this.mainCard.querySelector(`.popup__text--address`).textContent = ad.offer.address;
    this.mainCard.querySelector(`.popup__text--price`).textContent = `${ad.offer.price} ₽/ночь`;
    this.mainCard.querySelector(`.popup__type`).textContent = `${window.dataModule.RoomTypeTranslator[ad.offer.type]}`;
    this.mainCard.querySelector(`.popup__text--capacity`).textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
    this.mainCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${ad.offer.checkin}, выезд\t до ${ad.offer.checkout}`;
    this.mainCard.querySelector(`.popup__description `).textContent = ad.offer.description;
    this.mainCard.querySelector(`.popup__description `).textContent = ad.offer.description;
    this.mainCard.querySelector(`.popup__avatar`).src = ad.author.avatar;
    this.refactorLists(this.mainCard);
    Object.keys(ad.offer).forEach(function (key) {
      if (!ad.offer[key]) {
        switch (key) {
          case `rooms`:
          case `guests`:
            window.cardModule.mainCard.querySelector(`.popup__text--capacity`).setAttribute(`style`, `display: none`);
            break;
          default:
            window.cardModule.mainCard.querySelector(`.popup__${key}`).setAttribute(`style`, `display: none`);
            window.cardModule.mainCard.querySelector(`.popup__text--${key}`).setAttribute(`style`, `display: none`);
            break;
        }
      }
    });
    this.fillList(featuresWrapper, `features`, ad, null);
    this.fillList(photosWrapper, `photos`, ad, CARD_PHOTO_TEMPLATE);
  },
  refactorLists(fragment) {
    featuresWrapper = fragment.querySelector(`.popup__features`);
    featuresWrapper.innerHTML = ``;
    photosWrapper = fragment.querySelector(`.popup__photos`);
    if (photosWrapper.querySelector(`.popup__photo`) !== null) {
      photosWrapper.removeChild(photosWrapper.querySelector(`.popup__photo`));
    }
  },
  fillList(wrapper, objectKey, adItem, elementTemplate) {
    for (let j = 0; j < adItem.offer[objectKey].length; j++) {
      let element;
      if (objectKey === `features`) {
        element = document.createElement(`li`);
        element.className = `popup__feature popup__feature--${adItem.offer[objectKey][j]}`;
      } else {
        element = elementTemplate.cloneNode(true);
        element.src = adItem.offer[objectKey][j];
      }
      wrapper.appendChild(element);
    }
  },
  hide() {
    if (document.querySelector(`.map`).querySelector(`.map__card`)) {
      document.querySelector(`.map`).removeChild(document.querySelector(`.map__card`));
    }
  },
  create() {
    let fragment = CARD_TEMPLATE.cloneNode(true);
    document.querySelector(`.map__filters-container`).insertAdjacentHTML(`beforebegin`, fragment.outerHTML);
    this.mainCard = document.querySelector(`.map__card`);
    this.mainCard.setAttribute(`style`, `display: none`);
  },
  closeEsc(e) {
    if (e.key === `Escape`) {
      window.cardModule.mainCard.setAttribute(`style`, `display: none`);
    }
  },
  closeClick() {
    window.cardModule.mainCard.setAttribute(`style`, `display: none`);
  }
};

})();

(() => {
/*!**************************!*\
  !*** ./js/dataModule.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const ERROR_POPUP = document.querySelector(`.popup--error`);
window.dataModule = {
  ads: [],
  ROOM_TYPE: [`palace`, `flat`, `house`, `bungalow`],
  RoomTypeTranslator: {
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
    window.pinModule.load(5);
  },
  error(errorText) {
    ERROR_POPUP.querySelector(`.popup__text`).textContent = errorText;
    ERROR_POPUP.classList.remove(`popup--hidden`);
    ERROR_POPUP.querySelector(`.popup__close`).addEventListener(`click`, function () {
      ERROR_POPUP.classList.remove(`popup--hidden`);
    });
  }
};

})();

(() => {
/*!******************************!*\
  !*** ./js/debounceModule.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const DEBOUNCE_INTERVAL = 500; // ms

window.debounceModule = function (cb) {
  let lastTimeout = null;

  return function (...args) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb(...args);
    }, DEBOUNCE_INTERVAL);
  };
};

})();

(() => {
/*!**************************!*\
  !*** ./js/formModule.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const FORM = document.querySelector(`.ad-form`);
const AD_CAPACITY = FORM.querySelector(`#capacity`);
const AD_ROOMS = FORM.querySelector(`#room_number`);
const AD_TYPE = FORM.querySelector(`#type`);
const AD_PRICE = FORM.querySelector(`#price`);
const AD_TIMEIN = FORM.querySelector(`#timein`);
const AD_TIMEOUT = FORM.querySelector(`#timeout`);
window.formModule = {
  checkingChanges(evt) {
    let capacityValue = FORM.querySelector(`#capacity`).value;
    let roomsValue = FORM.querySelector(`#room_number`).value;
    // Сделано чтобы в будующем проверять и другие изменяющиеся поля
    switch (evt.target.id) {
      case `room_number`:
        AD_CAPACITY.querySelectorAll(`option`).forEach(function (option) {
          option.removeAttribute(`selected`);
          option.setAttribute(`disabled`, ``);
          if (option.value <= AD_ROOMS.value && option.value !== `0`) {
            option.removeAttribute(`disabled`);
          } else if (option.value === `0` && AD_ROOMS.value === `100`) {
            option.setAttribute(`selected`, ``);
            option.removeAttribute(`disabled`);
          }
        });
        break;
      case `capacity`:
        if (capacityValue === roomsValue) {
          AD_CAPACITY.setCustomValidity(``);
        }
        break;
      case `type`:
        switch (AD_TYPE.value) {
          case `bungalow`:
            AD_PRICE.setAttribute(`min`, `0`);
            AD_PRICE.setAttribute(`placeholder`, `0`);
            break;
          case `flat`:
            AD_PRICE.setAttribute(`min`, `1000`);
            AD_PRICE.setAttribute(`placeholder`, `1000`);
            break;
          case `house`:
            AD_PRICE.setAttribute(`min`, `5000`);
            AD_PRICE.setAttribute(`placeholder`, `5000`);
            break;
          case `palace`:
            AD_PRICE.setAttribute(`min`, `10000`);
            AD_PRICE.setAttribute(`placeholder`, `10000`);
            break;
        }
        break;
      case `timein`:
        AD_TIMEOUT.value = AD_TIMEIN.value;
        break;
      case `timeout`:
        AD_TIMEIN.value = AD_TIMEOUT.value;
        break;
      case `images`:
        window.filesModule.adPhoto(evt.target);
        break;
      case `avatar`:
        window.filesModule.adAvatar(evt.target);
        break;
    }
  },
  checkCapacity() {
    let capacityValue = FORM.querySelector(`#capacity`).value;
    let roomsValue = FORM.querySelector(`#room_number`).value;
    if (capacityValue !== roomsValue) {
      AD_CAPACITY.setCustomValidity(`Значения должны быть идентичны`);
    }
  },
  submit(e) {
    let ad = {};
    ad[`features`] = [];
    ad[`photos`] = [];
    ad[`avatar`] = `asdasd`;
    ad[`title`] = FORM.querySelector(`#title`).value;
    ad[`checkin`] = FORM.querySelector(`#timein`).value;
    ad[`checkin`] = FORM.querySelector(`#timeout`).value;
    ad[`description`] = FORM.querySelector(`#description`).value;
    ad[`rooms`] = FORM.querySelector(`#room_number`).value;
    ad[`guests`] = FORM.querySelector(`#capacity`).value;
    ad[`address`] = FORM.querySelector(`#address`).value.toString();
    ad[`price`] = FORM.querySelector(`#price`).value;
    ad[`type`] = FORM.querySelector(`#type`).value;
    FORM.querySelector(`.features`).querySelectorAll(`input`).forEach(function (el) {
      if (el.checked) {
        ad[`offer`][`features`].push(el.value);
      }
    });
    // TODO: Добавление фотографий
    window.upload.send(new FormData(e.target));
    e.preventDefault();
  },
  clear() {
    FORM.reset();
    document.querySelector(`.ad-form-header__preview`).querySelector(`img`).src = `img/muffin-grey.svg`;
    FORM.querySelector(`.ad-form__photo`).innerHTML = ``;
  }
};

})();

(() => {
/*!**************************!*\
  !*** ./js/fileModule.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


window.filesModule = {
  adPhoto(fileChooser) {
    const PREVIEW_CONTAINER = document.querySelector(`.ad-form__photo`);
    let preview = document.createElement(`img`);
    preview.setAttribute(`height`, `70`);
    preview.setAttribute(`width`, `70`);

    if (this.readFile(fileChooser, preview)) {
      PREVIEW_CONTAINER.appendChild(preview);
    }
  },
  adAvatar(fileChooser) {
    let preview = document.querySelector(`.ad-form-header__preview`).querySelector(`img`);
    this.readFile(fileChooser, preview);
  },
  readFile(fileChooser, preview) {
    let file = fileChooser.files[0];
    let fileName = file.name.toLowerCase();
    let flag = false;

    let matches = window.utilModule.FILE_TYPES.some(function (type) {
      return fileName.endsWith(type);
    });

    if (matches) {
      let reader = new FileReader();

      reader.addEventListener(`load`, function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);

      flag = true;
    }

    return flag;
  }
};

})();

(() => {
/*!**************************!*\
  !*** ./js/loadModule.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const URL = `https://21.javascript.pages.academy/keksobooking/data`;

window.loadModule = function (onSuccess, onError) {
  let xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.open(`GET`, URL);

  xhr.addEventListener(`load`, function () {
    if (xhr.status === window.utilModule.StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });
  xhr.timeout = window.utilModule.StatusCode.TIMEOUT;
  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.send();
};

})();

(() => {
/*!*************************!*\
  !*** ./js/mapModule.js ***!
  \*************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const PIN_CONTAINER = document.querySelector(`.map__pins`);

function openCardClick(evt) {
  window.cardModule.hide();
  let pinEl = evt.target.parentElement;
  document.removeEventListener(`keydown`, openCardEnter);
  window.mapModule.pins.forEach(function (pin) {
    pin.classList.remove(`map__pin--active`);
  });
  pinEl.classList.add(`map__pin--active`);
  window.cardModule.fill(pinEl.dataset.index);
  window.cardModule.mainCard.querySelector(`.popup__close`).addEventListener(`mousedown`, window.cardModule.closeClick);
  document.addEventListener(`keydown`, window.cardModule.closeEsc);
  window.mapModule.counter++;
}

function openCardEnter(evt) {
  if (evt.key === `Enter`) {
    window.cardModule.hide();
    let pinEl = evt.target;
    pinEl.removeEventListener(`click`, openCardClick);
    window.cardModule.fill(pinEl.dataset.index);
    window.cardModule.mainCard.querySelector(`.popup__close`).addEventListener(`mousedown`, window.cardModule.closeClick);
    window.cardModule.mainCard.querySelector(`.popup__close`).addEventListener(`focus`, window.cardModule.closeEsc);
    window.mapModule.counter++;
  }
  document.removeEventListener(`keydown`, openCardEnter);
}

window.mapModule = {
  pinContainer: [],
  pins: ``,
  counter: 0,
  addPinsListener() {
    this.pins = PIN_CONTAINER.querySelectorAll(`button`);
    for (let i = 1; i < this.pins.length; i++) {
      i = i - window.mapModule.counter * 10;
      this.pins[i].addEventListener(`click`, openCardClick);
      // TODO: Исправить callback hell
      this.pins[i].addEventListener(`focus`, function () {
        document.addEventListener(`keydown`, openCardEnter);
      });
    }
  },
  resetAll() {
    window.cardModule.hide();
    window.pinModule.resetMain();
    this.pins = ``;
  }
};

})();

(() => {
/*!*************************!*\
  !*** ./js/pinModule.js ***!
  \*************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const PIN_CONTAINER = document.querySelector(`.map__pins`);
const MAIN_PIN = document.querySelector(`.map__pin--main`);
const MAP = document.querySelector(`.map`);
const UPPER_BORDER = 130;
const LOWER_BORDER = 130;
let pinFragments = [];
function move(event) {
  let margin = (document.documentElement.clientWidth - MAP.clientWidth) / 2;
  if ((event.pageX > margin) && (event.pageX < (document.documentElement.clientWidth - margin)) && (event.pageY < LOWER_BORDER) && (event.pageY > UPPER_BORDER)) {
    MAIN_PIN.setAttribute(`style`, `left: ${Math.ceil(event.clientX - margin - MAIN_PIN.clientWidth / 2)}px; top: ${Math.ceil(event.pageY - MAIN_PIN.clientHeight / 2)}px`);
    window.utilModule.setAddress();
  }
}
window.pinModule = {
  listener() {
    document.addEventListener(`mousemove`, move);
    document.addEventListener(`mouseup`, function () {
      document.removeEventListener(`mousemove`, move);
      window.utilModule.setAddress();
    });
  },
  fillTemplate(count) {
    pinFragments = [];
    for (let i = 0; i < count; i++) {
      if (window.dataModule.ads[i].offer) {
        let fragment = PIN_TEMPLATE.cloneNode(true);
        fragment.setAttribute(`style`, `left: ${window.dataModule.ads[i].location.x + window.utilModule.PIN_WIDTH / 2}px; top: ${window.dataModule.ads[i].location.y + window.utilModule.PIN_WIDTH / 2}px`);
        fragment.querySelector(`img`).src = window.dataModule.ads[i].author.avatar;
        fragment.querySelector(`img`).alt = window.dataModule.ads[i].offer.title;
        fragment.dataset.index = i;
        pinFragments.push(fragment);
      }
    }
  },
  show(count) {
    PIN_CONTAINER.querySelectorAll(`.map__pin`).forEach(function (pin, i) {
      if (i > 0) {
        pin.parentNode.removeChild(pin);
      }
    });
    for (let i = 0; i < count; i++) {
      PIN_CONTAINER.appendChild(pinFragments[i]);
    }
    PIN_CONTAINER.querySelectorAll(`.map__pin`).forEach(function (pin, index) {
      if (index !== 0) {
        pin.classList.remove(`map__pin--hidden`);
      }
    });
    window.mapModule.addPinsListener();
  },
  resetMain() {
    MAIN_PIN.setAttribute(`style`, `left: 570px; top: 375px;`);
  },
  hide() {
    PIN_CONTAINER.querySelectorAll(`.map__pin`).forEach(function (pin, index) {
      if (index !== 0) {
        pin.classList.add(`map__pin--hidden`);
      }
    });
  },
  load(count) {
    this.fillTemplate(count);
    this.show(count);
  },
  mainDown() {
    MAIN_PIN.addEventListener(`mousedown`, this.listener);
  }
};

})();

(() => {
/*!****************************!*\
  !*** ./js/renderModule.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const FILTER_FORM = document.querySelector(`.map__filters`);

const Prices = {
  any: {
    min: Number.NEGATIVE_INFINITY,
    max: Number.POSITIVE_INFINITY
  },
  middle: {
    min: 10000,
    max: 50000
  },
  low: {
    min: Number.NEGATIVE_INFINITY,
    max: 10000
  },
  high: {
    min: 50000,
    max: Number.POSITIVE_INFINITY
  }
};

function getCountOfAds(ads) {
  let count = 0;
  ads.forEach(function (ad) {
    if (count < 5) {
      if (ad[`matched`] >= 1) {
        count++;
      }
    }
  });
  return count;
}

function sortByParam(ads) {
  ads.sort((a, b) => a.matched < b.matched ? 1 : -1);
  window.pinModule.load(getCountOfAds(ads));
}

function getTotalMatch(object) {
  object[`matched`] = 0;
  Object.keys(object[`matches`]).forEach(function (key) {
    if (key === `features`) {
      if (object[`matches`][key].length === 0) {
        object[`matched`] += 1;
      } else {
        object[`matched`] += object[`matches`][key].length + 1;
      }
    } else {
      object[`matched`] += object[`matches`][key];
    }
  });
}
window.renderModule = {
  change(evt) {
    switch (evt.target.name) {
      case `housing-type`:
        window.renderModule.simpleFilter(`type`, evt.target.value);
        break;
      case `housing-guests`:
        window.renderModule.simpleFilter(`guests`, evt.target.value);
        break;
      case `housing-rooms`:
        window.renderModule.simpleFilter(`rooms`, evt.target.value);
        break;
      case `housing-price`:
        window.renderModule.filterPrice(evt.target.value);
        break;
      case `features`:
        window.renderModule.filterFeatures(evt.target);
        break;
    }
  },
  simpleFilter(parameter, match) {
    window.cardModule.hide();
    window.dataModule.ads.forEach(function (ad) {
      if (match === `any`) {
        ad[`matches`][parameter] = 1;
      } else {
        ad[`matches`][parameter] = 0;
        if (ad.offer[parameter].toString() === match) {
          ad[`matches`][parameter]++;
        }
      }
      getTotalMatch(ad);
    });
    sortByParam(window.dataModule.ads);
  },
  filterPrice(value) {
    window.cardModule.hide();
    window.dataModule.ads.forEach(function (ad) {
      ad[`matches`][`price`] = 0;
      if (value === `any`) {
        ad[`matches`][`price`] = 1;
      }
      if (ad.offer.price >= Prices[value].min && ad.offer.price <= Prices[value].max) {
        ad[`matches`][`price`]++;
      }
      getTotalMatch(ad);
    });
    sortByParam(window.dataModule.ads);
  },
  filterFeatures(target) {
    window.cardModule.hide();
    window.dataModule.ads.forEach(function (ad) {
      ad.offer.features.forEach(function (feature) {
        if (feature === target.value) {
          if (target.checked) {
            ad[`matches`][`features`].push(feature);
          } else {
            ad[`matches`][`features`].splice(ad[`matches`][`features`].indexOf(feature), 1);
          }
        }
      });
      getTotalMatch(ad);
    });
    sortByParam(window.dataModule.ads);
  },
  removeFilters() {
    FILTER_FORM.querySelectorAll(`select`).forEach(function (select) {
      select.selectedIndex = 0;
    });
    FILTER_FORM.querySelectorAll(`fieldset`).forEach(function (field) {
      field.querySelectorAll(`input`).forEach(function (input) {
        input.removeAttribute(`checked`);
      });
    });
  }

};

})();

(() => {
/*!****************************!*\
  !*** ./js/uploadModule.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const URL = `https://21.javascript.pages.academy/keksobooking`;
const SUCCESS_TEMPLATE = document.querySelector(`#success`);
const ERROR_TEMPLATE = document.querySelector(`#error`);

function removeSuccessPopup(e) {
  if (e.key === `Escape`) {
    document.querySelector(`main`).removeChild(window.upload.popup);
    document.removeEventListener(`keydown`, removeSuccessPopup);
  }
}


function removeSuccessPopupClick() {
  document.querySelector(`main`).removeChild(window.upload.popup);
  window.upload.popup.querySelector(`.error__button`).removeEventListener(`click`, removeSuccessPopupClick);
  window.removeEventListener(`click`, removeSuccessPopupClick);
}

window.upload = {
  popup: ``,
  createSuccess() {
    this.popup = SUCCESS_TEMPLATE.cloneNode(true).content.querySelector(`.success`);
    document.querySelector(`main`).appendChild(this.popup);
    document.addEventListener(`keydown`, removeSuccessPopup);
  },
  createError() {
    this.popup = ERROR_TEMPLATE.cloneNode(true).content.querySelector(`.error`);
    document.querySelector(`main`).appendChild(this.popup);
    document.addEventListener(`keydown`, removeSuccessPopup);
    this.popup.querySelector(`.error__button`).addEventListener(`click`, removeSuccessPopupClick);
    window.addEventListener(`click`, removeSuccessPopupClick);
  },
  send(message) {
    let xhr = new XMLHttpRequest();
    xhr.open(`POST`, URL);

    xhr.responseType = `json`;
    xhr.send(message);

    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (xhr.status === window.utilModule.StatusCode.OK) {
          window.upload.createSuccess();
        } else {
          window.upload.createError();
        }
      }
    };
  }
};

})();

(() => {
/*!**************************!*\
  !*** ./js/utilModule.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const FORM = document.querySelector(`.ad-form`);
const MAIN_PIN = document.querySelector(`.map__pin--main`);
window.utilModule = {
  START_CHECKIN: 12,
  OCLOCK: `:00`,
  PIN_WIDTH: 40,
  PIN_LOCATION_Y_START: 130,
  MAIN_PIN_AFTER_WIDTH: 10,
  MAIN_PIN_AFTER_HEIGHT: 22,
  isReset: false,
  additional: true,
  StatusCode: {
    OK: 200,
    PAGE_NOT_FOUND: 404,
    FORBIDDEN: 500,
    INTERNAL_SERVER: 500,
  },
  FILE_TYPES: [`gif`, `jpg`, `jpeg`, `png`],
  setAddress() {
    FORM.querySelector(`#address`).value = `${Math.trunc(MAIN_PIN.offsetLeft) + Math.trunc(MAIN_PIN.clientWidth / 2)},${MAIN_PIN.offsetTop + MAIN_PIN.clientHeight + this.MAIN_PIN_AFTER_HEIGHT}`;
  }
};

})();

(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const MAP = document.querySelector(`.map`);
const SUBMIT_FORM = document.querySelector(`.ad-form`);
const FILTER_FORM = document.querySelector(`.map__filters`);
const MAP_FILTERS = document.querySelector(`.map__filters`);
const MAIN_PIN = document.querySelector(`.map__pin--main`);

function toggleState() {
  toggleInactiveState(false);
}

function openMapClick(evt) {
  window.pinModule.mainDown();
  if (evt.button === 0) {
    toggleInactiveState(true);
    document.removeEventListener(`keydown`, openMapEnter);
  }
}

function submitForm(evt) {
  window.formModule.submit(evt);
  toggleInactiveState(false);
}

function openMapEnter() {
  window.pinModule.mainDown();
  document.addEventListener(`keydown`, function (e) {
    if (e.key === `Enter`) {
      toggleInactiveState(true);
      MAIN_PIN.removeEventListener(`mousedown`, openMapClick);
    }
  });
}

function toggleInactiveState(isRemoving) {
  if (isRemoving) {
    MAP.classList.remove(`map--faded`);
    SUBMIT_FORM.classList.remove(`ad-form--disabled`);
    MAIN_PIN.removeEventListener(`mousedown`, openMapClick);
    MAIN_PIN.removeEventListener(`focus`, openMapEnter);
    window.dataModule.fillOffers();
    window.utilModule.setAddress();
    window.formModule.checkCapacity();
    SUBMIT_FORM.addEventListener(`submit`, submitForm);
    SUBMIT_FORM.querySelector(`.ad-form__reset`).addEventListener(`click`, toggleState);
    FILTER_FORM.addEventListener(`change`, window.debounceModule(window.renderModule.change));
    window.cardModule.create();
  } else {
    window.renderModule.removeFilters();
    window.formModule.clear();
    SUBMIT_FORM.querySelector(`.ad-form__reset`).removeEventListener(`click`, toggleState);
    MAIN_PIN.addEventListener(`mousedown`, openMapClick);
    MAIN_PIN.addEventListener(`focus`, openMapEnter);
    window.pinModule.hide();
    window.dataModule.ads = [];
    if (window.utilModule.isReset === true) {
      window.mapModule.resetAll();
    }
    // else {
    //   window.cardModule.createCard();
    // }
    MAP.classList.add(`map--faded`);
    SUBMIT_FORM.classList.add(`ad-form--disabled`);
    SUBMIT_FORM.querySelector(`#address`).value = `${Math.trunc(MAIN_PIN.offsetLeft - MAIN_PIN.clientWidth / 2)},${Math.trunc(MAIN_PIN.offsetLeft - MAIN_PIN.clientHeight / 2)}`;
    MAIN_PIN.addEventListener(`mousedown`, openMapClick);
    MAIN_PIN.addEventListener(`focus`, openMapEnter);
    window.utilModule.isReset = true;
    document.removeEventListener(`mousemove`, window.pinModule.listener);
  }
  document.querySelector(`.notice`).querySelectorAll(`fieldset`).forEach(function (field) {
    field.toggleAttribute(`disabled`);
  });

  MAP_FILTERS.toggleAttribute(`disabled`);

  MAP_FILTERS.classList.toggle(`map__filters--disabled`);

  MAP_FILTERS.querySelectorAll(`select`).forEach(function (field) {
    field.toggleAttribute(`disabled`);
  });
}

toggleInactiveState(false);

SUBMIT_FORM.addEventListener(`change`, function (evt) {
  window.formModule.checkingChanges(evt);
});

SUBMIT_FORM.addEventListener(`submit`, function () {
  window.formModule.checkCapacity();
});

})();

/******/ })()
;