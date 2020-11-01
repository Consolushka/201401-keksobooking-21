/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!**************************!*\
  !*** ./js/utilModule.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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

(() => {
/*!**************************!*\
  !*** ./js/loadModule.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


let url;
let method;

window.loadModule = {
  popup: ``,
  get(type) {
    if (type === `get`) {
      url = `https://21.javascript.pages.academy/keksobooking/data`;
    } else {
      url = `https://21.javascript.pages.academy/keksobooking`;
    }
    method = type.toUpperCase();
  },
  send(type, message, onSuccess, onError) {
    this.get(type);
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = `json`;
    if (type === `get`) {
      xhr.send();
    } else {
      xhr.send(message);
    }

    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (xhr.status === window.utilModule.StatusCode.OK) {
          onSuccess(xhr.response);
        } else {
          onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
        }
      }
    };
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
const UPPER_BORDER = 74;
const LOWER_BORDER = 576;
let pinFragments = [];
const onMainPinMove = (e)=> {
  let margin = (document.documentElement.clientWidth - MAP.clientWidth) / 2;
  if ((e.pageX > margin) && (e.pageX < (document.documentElement.clientWidth - margin)) && (e.pageY < LOWER_BORDER) && (e.pageY > UPPER_BORDER)) {
    MAIN_PIN.setAttribute(`style`, `left: ${Math.ceil(e.clientX - margin - MAIN_PIN.clientWidth / 2)}px; top: ${Math.ceil(e.pageY - MAIN_PIN.clientHeight / 2)}px`);
    window.utilModule.setAddress();
  }
};
window.pinModule = {
  onMainPinDown() {
    document.addEventListener(`mousemove`, onMainPinMove);
    document.addEventListener(`mouseup`, ()=> {
      document.removeEventListener(`mousemove`, onMainPinMove);
      window.utilModule.setAddress();
    });
  },
  fillTemplate(count, ads) {
    pinFragments = [];
    for (let i = 0; i < count; i++) {
      if (ads[i].offer) {
        let fragment = PIN_TEMPLATE.cloneNode(true);
        fragment.setAttribute(`style`, `left: ${ads[i].location.x + window.utilModule.PIN_WIDTH / 2}px; top: ${ads[i].location.y + window.utilModule.PIN_WIDTH / 2}px`);
        fragment.querySelector(`img`).src = ads[i].author.avatar;
        fragment.querySelector(`img`).alt = ads[i].offer.title;
        fragment.dataset.index = i;
        pinFragments.push(fragment);
      }
    }
  },
  show(count) {
    PIN_CONTAINER.querySelectorAll(`.map__pin`).forEach((pin, i)=> {
      if (i > 0) {
        pin.parentNode.removeChild(pin);
      }
    });
    for (let i = 0; i < count; i++) {
      PIN_CONTAINER.appendChild(pinFragments[i]);
    }
    PIN_CONTAINER.querySelectorAll(`.map__pin`).forEach((pin, index)=> {
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
    PIN_CONTAINER.querySelectorAll(`.map__pin`).forEach((pin, index)=> {
      if (index !== 0) {
        pin.classList.add(`map__pin--hidden`);
      }
    });
  },
  load(count, ads) {
    window.dataModule.newAds = [];
    window.dataModule.newAds.push(ads);
    this.fillTemplate(count, ads);
    this.show(count, ads);
  },
  mainDown() {
    MAIN_PIN.addEventListener(`mousedown`, this.onMainPinDown);
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

window.debounceModule = (cb)=> {
  let lastTimeout = null;

  return (...args)=> {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(()=> {
      cb(...args);
    }, DEBOUNCE_INTERVAL);
  };
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

const getCountOfAds = (ads)=> {
  let currentList = [];
  ads.forEach((ad)=> {
    if (currentList.length < window.dataModule.countOfAds) {
      if (ad.matched === window.renderModule.count) {
        currentList.push(ad);
      }
    }
  });
  window.pinModule.load(currentList.length, currentList);
};

window.renderModule = {
  match: {
    type: -1,
    guests: -1,
    rooms: -1,
    price: -1,
    features: []
  },
  count: 0,
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
        evt.target.toggleAttribute(`checked`);
        window.renderModule.filterFeatures(evt.target);
        break;
    }
  },
  simpleFilter(parameter, match) {
    window.cardModule.hide();
    if (match === `any`) {
      this.match[parameter] = -1;
      this.count--;
    } else {
      if (this.match[parameter] === -1) {
        this.count++;
      }
      this.match[parameter] = match;
    }
    this.getTotalMatch();
  },
  filterPrice(value) {
    window.cardModule.hide();
    if (value === `any`) {
      this.match[`price`] = -1;
      this.count--;
    } else {
      if (this.match.price === -1) {
        this.count++;
      }
      this.match[`price`] = value;
      this.getTotalMatch();
    }
  },
  filterFeatures(target) {
    window.cardModule.hide();
    if (target.checked) {
      this.count++;
      this.match.features.push(target.value);
    } else {
      this.count--;
      this.match.features.splice(this.match.features.indexOf(target.value), 1);
    }
    this.getTotalMatch();
  },
  removeFilters() {
    FILTER_FORM.reset();
    FILTER_FORM.querySelectorAll(`fieldset`).forEach((field) => {
      field.querySelectorAll(`input`).forEach((input) => {
        input.removeAttribute(`checked`);
      });
    });
  },
  sumFeatures(key, ad) {
    window.renderModule.match[key].forEach((filteredFeature) => {
      ad.offer[key].forEach((feature) => {
        if (filteredFeature === feature) {
          ad.matched++;
        }
      });
    });
  },
  getTotalMatch() {
    window.dataModule.ads.forEach((ad) => {
      ad[`matched`] = 0;
      Object.keys(window.renderModule.match).forEach((key)=> {
        if (window.renderModule.match[key] !== -1) {
          switch (key) {
            case `price`:
              if (ad.offer[key] >= Prices[window.renderModule.match[key]].min && ad.offer[key] <= Prices[window.renderModule.match[key]].max) {
                ad.matched++;
              }
              break;
            case `features`:
              window.renderModule.sumFeatures(key, ad);
              break;
            default:
              if (ad.offer[key].toString() === window.renderModule.match[key]) {
                ad.matched++;
              }
              break;
          }
        }
      });
    });
    getCountOfAds(window.dataModule.ads);
  }
};

})();

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
    let ad = window.dataModule.newAds[0][index];
    this.mainCard.querySelector(`.popup__photos`).innerHTML = ``;
    this.mainCard.removeAttribute(`style`);
    this.mainCard.querySelector(`.popup__title`).textContent = ad.offer.title;
    this.mainCard.querySelector(`.popup__text--address`).textContent = ad.offer.address;
    this.mainCard.querySelector(`.popup__text--price`).textContent = `${ad.offer.price} ₽/ночь`;
    this.mainCard.querySelector(`.popup__type`).textContent = `${window.dataModule.roomTypeTranslator[ad.offer.type.toUpperCase()]}`;
    this.mainCard.querySelector(`.popup__text--capacity`).textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
    this.mainCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${ad.offer.checkin}, выезд\t до ${ad.offer.checkout}`;
    this.mainCard.querySelector(`.popup__description `).textContent = ad.offer.description;
    this.mainCard.querySelector(`.popup__description `).textContent = ad.offer.description;
    this.mainCard.querySelector(`.popup__avatar`).src = ad.author.avatar;
    this.refactorLists(this.mainCard);
    Object.keys(ad.offer).forEach((key)=> {
      if (ad.offer[key].length === 0) {
        switch (key) {
          case `rooms`:
          case `guests`:
            this.mainCard.querySelector(`.popup__text--capacity`).setAttribute(`style`, `display: none`);
            break;
          default:
            this.mainCard.querySelector(`.popup__${key}`).setAttribute(`style`, `display: none`);
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
  onDocumentEsc(e) {
    if (e.key === `Escape`) {
      window.cardModule.hide();
    }
  },
  onCloseClick() {
    window.cardModule.hide();
  }
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
const SUCCESS_TEMPLATE = document.querySelector(`#success`);
const ERROR_TEMPLATE = document.querySelector(`#error`);

const closePopup = ()=> {
  document.querySelector(`main`).removeChild(window.loadModule.popup);
  document.removeEventListener(`keydown`, onPopupEnter);
  window.removeEventListener(`click`, closePopup);
  window.removeEventListener(`click`, onCloseClick);
};

const onPopupEnter = (e)=> {
  if (e.key === `Escape`) {
    closePopup();
  }
};

const onCloseClick = ()=> {
  closePopup();
  window.loadModule.popup.querySelector(`.error__button`).removeEventListener(`click`, onCloseClick);
};

const createSuccess = ()=> {
  window.loadModule.popup = SUCCESS_TEMPLATE.cloneNode(true).content.querySelector(`.success`);
  document.querySelector(`main`).appendChild(window.loadModule.popup);
  document.addEventListener(`keydown`, onPopupEnter);
  window.addEventListener(`click`, closePopup);
};

const createError = ()=> {
  window.loadModule.popup = ERROR_TEMPLATE.cloneNode(true).content.querySelector(`.error`);
  document.querySelector(`main`).appendChild(window.loadModule.popup);
  document.addEventListener(`keydown`, onPopupEnter);
  window.loadModule.popup.querySelector(`.error__button`).addEventListener(`click`, onCloseClick);
  window.addEventListener(`click`, onCloseClick);
};

window.formModule = {
  checkingChanges(evt) {
    let capacityValue = FORM.querySelector(`#capacity`).value;
    let roomsValue = FORM.querySelector(`#room_number`).value;
    switch (evt.target.id) {
      case `room_number`:
        AD_CAPACITY.querySelectorAll(`option`).forEach((option)=> {
          option.removeAttribute(`selected`);
          option.setAttribute(`disabled`, ``);
          if (option.value <= AD_ROOMS.value && option.value !== `0`) {
            option.removeAttribute(`disabled`);
          } else if (option.value === `0` && AD_ROOMS.value === `100`) {
            AD_CAPACITY.querySelectorAll(`option`)[2].setAttribute(`disabled`, ``);
            option.setAttribute(`selected`, ``);
            option.removeAttribute(`disabled`);
          }
        });
        break;
      case `capacity`:
        if (capacityValue === roomsValue) {
          AD_CAPACITY.setCustomValidity(``);
        } else if (capacityValue === `0` && roomsValue === `100`) {
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
      if (roomsValue === 100 && capacityValue !== `0`) {
        AD_CAPACITY.setCustomValidity(`Значения должны быть идентичны`);
      }
    }
  },
  submit(e) {
    window.loadModule.send(`post`, new FormData(e.target), createSuccess, createError);
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

    let matches = window.utilModule.FILE_TYPES.some((type)=> {
      return fileName.endsWith(type);
    });

    if (matches) {
      let reader = new FileReader();

      reader.addEventListener(`load`, ()=> {
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
/*!*************************!*\
  !*** ./js/mapModule.js ***!
  \*************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const PIN_CONTAINER = document.querySelector(`.map__pins`);

const onPinClick = (evt)=> {
  window.cardModule.hide();
  let pinEl = evt.target.parentElement;
  if (evt.target.tagName.toLowerCase() === `button`) {
    pinEl = evt.target;
  }
  document.removeEventListener(`keydown`, onPinEnter);
  window.mapModule.pins.forEach((pin)=> {
    pin.classList.remove(`map__pin--active`);
  });
  pinEl.classList.add(`map__pin--active`);
  window.cardModule.fill(pinEl.dataset.index);
  window.cardModule.mainCard.querySelector(`.popup__close`).addEventListener(`mousedown`, window.cardModule.onCloseClick);
  document.addEventListener(`keydown`, window.cardModule.onDocumentEsc);
};

const onPinEnter = (evt)=> {
  if (evt.key === `Enter`) {
    window.cardModule.hide();
    let pinEl = evt.target;
    pinEl.removeEventListener(`click`, onPinClick);
    window.cardModule.fill(pinEl.dataset.index);
    window.cardModule.mainCard.querySelector(`.popup__close`).addEventListener(`mousedown`, window.cardModule.onCloseClick);
    window.cardModule.mainCard.querySelector(`.popup__close`).addEventListener(`focus`, window.cardModule.onDocumentEsc);
  }
  document.removeEventListener(`keydown`, onPinEnter);
};

window.mapModule = {
  pinContainer: [],
  pins: ``,
  addPinsListener() {
    this.pins = PIN_CONTAINER.querySelectorAll(`button`);
    for (let i = 1; i < this.pins.length; i++) {
      this.pins[i].addEventListener(`click`, onPinClick);
      this.pins[i].addEventListener(`focus`, ()=> {
        document.addEventListener(`keydown`, onPinEnter);
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

const toggleState = ()=> {
  toggleInactiveState(false);
};

const openMap = ()=>{
  toggleInactiveState(true);
  document.removeEventListener(`keydown`, onMainPinEnter);
  MAIN_PIN.removeEventListener(`mousedown`, onMainPinClick);
};

const onMainPinClick = (evt)=>{
  window.pinModule.mainDown();
  if (evt.button === 0) {
    openMap();
  }
};

const submitForm = (evt)=>{
  window.formModule.submit(evt);
  toggleInactiveState(false);
  SUBMIT_FORM.removeEventListener(`submit`, submitForm);
};

const onMainPinEnter = ()=>{
  window.pinModule.mainDown();
  document.addEventListener(`keydown`, (e)=> {
    if (e.key === `Enter`) {
      openMap();
    }
  });
};

const toggleInactiveState = (isRemoving)=>{
  if (isRemoving) {
    MAP.classList.remove(`map--faded`);
    SUBMIT_FORM.classList.remove(`ad-form--disabled`);
    MAIN_PIN.removeEventListener(`mousedown`, onMainPinClick);
    MAIN_PIN.removeEventListener(`focus`, onMainPinEnter);
    window.pinModule.mainDown();
    window.dataModule.fillOffers();
    window.utilModule.setAddress();
    window.formModule.checkCapacity();
    SUBMIT_FORM.addEventListener(`submit`, submitForm);
    SUBMIT_FORM.querySelector(`.ad-form__reset`).addEventListener(`click`, toggleState);
    FILTER_FORM.addEventListener(`change`, window.debounceModule(window.renderModule.change));

    SUBMIT_FORM.addEventListener(`change`, (evt)=> {
      window.formModule.checkingChanges(evt);
    });

    FILTER_FORM.querySelectorAll(`.map__checkbox`).forEach((checkbox)=> {
      checkbox.addEventListener(`focus`, (check)=> {
        checkbox.addEventListener(`keydown`, (evt)=> {
          if (evt.key === `Enter`) {
            checkbox.toggleAttribute(`checked`);
            window.renderModule.change(check);
          }
        });
      });
    });

    SUBMIT_FORM.addEventListener(`submit`, ()=> {
      window.formModule.checkCapacity();
    });
  } else {
    window.renderModule.removeFilters();
    window.formModule.clear();
    SUBMIT_FORM.querySelector(`.ad-form__reset`).removeEventListener(`click`, toggleState);
    window.pinModule.hide();
    window.dataModule.ads = [];
    if (window.utilModule.isReset) {
      window.mapModule.resetAll();
    }
    MAP.classList.add(`map--faded`);
    SUBMIT_FORM.classList.add(`ad-form--disabled`);
    SUBMIT_FORM.querySelector(`#address`).value = `${Math.trunc(MAIN_PIN.offsetLeft - MAIN_PIN.clientWidth / 2)},${Math.trunc(MAIN_PIN.offsetLeft - MAIN_PIN.clientHeight / 2)}`;
    MAIN_PIN.addEventListener(`mousedown`, onMainPinClick);
    MAIN_PIN.addEventListener(`focus`, onMainPinEnter);
    window.utilModule.isReset = true;
    document.removeEventListener(`mousemove`, window.pinModule.onMainPinDown);
  }
  document.querySelector(`.notice`).querySelectorAll(`fieldset`).forEach((field)=> {
    field.toggleAttribute(`disabled`);
  });

  MAP_FILTERS.toggleAttribute(`disabled`);

  MAP_FILTERS.classList.toggle(`map__filters--disabled`);

  MAP_FILTERS.querySelectorAll(`select`).forEach((field)=> {
    field.toggleAttribute(`disabled`);
  });
};

toggleInactiveState(false);

})();

/******/ })()
;