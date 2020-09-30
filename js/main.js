'use strict';

const ROOM_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const ROOM_TYPE_TRANSLATER = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`

};
const FEATURES_LIST = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS_LIST = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MAP = document.querySelector(`.map`);
const FORM = document.querySelector(`.ad-form`);
const MAP_FILTERS = document.querySelector(`.map__filters`);
const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const CARD_TEMPLATE = document.querySelector(`#card`).content.querySelector(`.map__card`);
const CARD_PHOTO_TEMPLATE = document.querySelector(`#card`).content.querySelector(`.popup__photo`);
const PIN_CONTAINER = document.querySelector(`.map__pins`);
const START_CHECKIN = 12;
const OCLOCK = `:00`;
const PIN_WIDTH = 40;
const PIN_LOCATION_Y_START = 130;
const MAIN_PIN = document.querySelector(`.map__pin--main`);
const MAIN_PIN_AFTER_WIDTH = 10;
const MAIN_PIN_AFTER_HEIGHT = 22;
let ads = [];
let featuresArr;
let featuresWrapper;
let photosArr;
let photosWrapper;
let pinFragments = [];
let cardsFragments = [];

function toggleInactiveState(isRemoving) {
  if (isRemoving) {
    MAP.classList.remove(`map--faded`);
    FORM.classList.remove(`ad-form--disabled`);
    FORM.querySelector(`#address`).value = `${MAIN_PIN.offsetLeft - MAIN_PIN_AFTER_WIDTH / 2};${MAIN_PIN.offsetLeft - MAIN_PIN_AFTER_HEIGHT / 2}`;
    loadOffers();
  } else {
    FORM.querySelector(`#address`).value = `${MAIN_PIN.offsetLeft - MAIN_PIN.clientWidth / 2};${MAIN_PIN.offsetLeft - MAIN_PIN.clientHeight / 2}`;
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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRandomArr(arr, plotArr, length, max) {
  let item = getRandomInt(max);
  if (arr.length < length) {
    if (!arr.includes(plotArr[item])) {
      arr.push(plotArr[item]);
    }
    getRandomArr(arr, plotArr, length, max);
  }
  return arr;
}

function fillOffers() {
  for (let i = 1; i <= 8; i++) {
    featuresArr = [];
    photosArr = [];
    let obj = {
      author: {
        avatar: `img/avatars/user0${i}.png`
      },
      offer: {
        title: `Title${i}`,
        address: `${getRandomInt(600)},${getRandomInt(350)}`,
        price: getRandomInt(1000),
        type: ROOM_TYPE[i % ROOM_TYPE.length],
        rooms: getRandomInt(4) + 1,
        guests: getRandomInt(3),
        checkin: `${START_CHECKIN + getRandomInt(2)}${OCLOCK}`,
        checkout: `${START_CHECKIN + getRandomInt(2)}${OCLOCK}`,
        features: getRandomArr(featuresArr, FEATURES_LIST, getRandomInt(FEATURES_LIST.length), FEATURES_LIST.length),
        description: `desc${i}`,
        photos: getRandomArr(photosArr, PHOTOS_LIST, getRandomInt(PHOTOS_LIST.length), PHOTOS_LIST.length)
      },
      location: {
        x: getRandomInt(MAP.offsetWidth - PIN_WIDTH),
        y: PIN_LOCATION_Y_START + getRandomInt(500)
      }
    };
    ads.push(obj);
  }
}

function fillPinTemplate() {
  for (let i = 0; i < ads.length; i++) {
    let fragment = PIN_TEMPLATE.cloneNode(true);
    fragment.setAttribute(`style`, `left: ${ads[i].location.x + PIN_WIDTH / 2}px; top: ${ads[i].location.y + PIN_WIDTH / 2}px`);
    fragment.querySelector(`img`).src = ads[i].author.avatar;
    fragment.querySelector(`img`).alt = ads[i].offer.title;
    pinFragments.push(fragment);
  }
}

/* function fillCardList(wrapper, objectKey, adItem, elementTemplate) {
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
}

function refactorLists(fragment) {
  featuresWrapper = fragment.querySelector(`.popup__features`);
  featuresWrapper.innerHTML = ``;
  photosWrapper = fragment.querySelector(`.popup__photos`);
  photosWrapper.removeChild(photosWrapper.querySelector(`.popup__photo`));
}

function fillCardTemplate() {
  for (let i = 0; i < ads.length; i++) {
    let fragment = CARD_TEMPLATE.cloneNode(true);
    fragment.querySelector(`.popup__title`).textContent = ads[i].offer.title;
    fragment.querySelector(`.popup__text--address`).textContent = ads[i].offer.address;
    fragment.querySelector(`.popup__text--price`).textContent = `${ads[i].offer.price} ₽/ночь`;
    fragment.querySelector(`.popup__type`).textContent = `${ROOM_TYPE_TRANSLATER[ads[i].offer.type]}`;
    fragment.querySelector(`.popup__text--capacity`).textContent = `${ads[i].offer.rooms} комнаты для ${ads[i].offer.guests} гостей`;
    fragment.querySelector(`.popup__text--time`).textContent = `Заезд после ${ads[i].offer.checkin}, выезд\t до ${ads[i].offer.checkout}`;
    fragment.querySelector(`.popup__description `).textContent = ads[i].offer.description;
    fragment.querySelector(`.popup__description `).textContent = ads[i].offer.description;
    fragment.querySelector(`.popup__avatar`).src = ads[i].author.avatar;
    refactorLists(fragment);
    fillCardList(featuresWrapper, `features`, ads[i], null);
    fillCardList(photosWrapper, `photos`, ads[i], CARD_PHOTO_TEMPLATE);
    cardsFragments.push(fragment);
  }
}*/

function showPins() {
  for (let i = 0; i < pinFragments.length; i++) {
    PIN_CONTAINER.appendChild(pinFragments[i]);
  }
}

function loadOffers() {
  fillOffers();
  loadPins();
  // loadCards();
}

function loadPins() {
  fillPinTemplate();
  showPins();
}

/* function loadCards() {
  fillCardTemplate();
  showCards();
}

function showCards() {
  cardsFragments.forEach(function (card) {
    document.querySelector(`.map__filters-container`).insertAdjacentHTML(`beforebegin`, card.outerHTML);
  });
}*/

toggleInactiveState(false);

MAIN_PIN.addEventListener(`mousedown`, function (e) {
  if (e.button === 0) {
    toggleInactiveState(true);
  }
});

MAIN_PIN.addEventListener(`focus`, function () {
  document.addEventListener(`keydown`, function (e) {
    if (e.key === `Enter`) {
      toggleInactiveState(true);
    }
  });
});

FORM.addEventListener(`change`, function (e) {
  const AD_ROOMS = FORM.querySelector(`#room_number`);
  const AD_CAPACITY = FORM.querySelector(`#capacity`);
  // Сделано чтобы в будующем проверять и другие изменяющиеся поля
  switch (e.target.id) {
    case `room_number`:
      AD_CAPACITY.querySelectorAll(`option`).forEach(function (option) {
        option.removeAttribute(`selected`);
        option.setAttribute(`disabled`, ``);
        if (option.value === AD_ROOMS.value) {
          option.setAttribute(`selected`, ``);
          option.removeAttribute(`disabled`);
        }
      });
      break;
    case `capacity`:
      if (AD_CAPACITY.value !== AD_ROOMS.value) {
        AD_CAPACITY.setCustomValidity(`Не соответствует ожидаемому значению`);
      }

  }
});
