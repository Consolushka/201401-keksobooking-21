'use strict';

const ROOM_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const FEATURES_LIST = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS_LIST = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MAP = document.querySelector(`.map`);
const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const PIN_CONTAINER = document.querySelector(`.map__pins`);
const START_CHECKIN = 12;
const OCLOCK = `:00`;
const PIN_WIDTH = 40;
const PIN_LOCATION_Y_START = 130;
let ads = [];
let features;
let photos;
let fragments = [];

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
    features = [];
    photos = [];
    let obj = {
      author: {
        avatar: `img/avatars/user0${i}.png`
      },
      offer: {
        title: `Title${i}`,
        address: `${getRandomInt(600)},${getRandomInt(350)}`,
        price: getRandomInt(1000),
        type: ROOM_TYPE[i % ROOM_TYPE.length],
        rooms: getRandomInt(4),
        guests: getRandomInt(3),
        checkin: `${START_CHECKIN + getRandomInt(2)}+${OCLOCK}`,
        checkout: `${START_CHECKIN + getRandomInt(2)}+${OCLOCK}`,
        features: getRandomArr(features, FEATURES_LIST, getRandomInt(FEATURES_LIST.length), FEATURES_LIST.length),
        description: `desc${i}`,
        photos: getRandomArr(photos, PHOTOS_LIST, getRandomInt(PHOTOS_LIST.length), PHOTOS_LIST.length)
      },
      location: {
        x: getRandomInt(MAP.offsetWidth - PIN_WIDTH),
        y: PIN_LOCATION_Y_START + getRandomInt(500)
      }
    };
    ads.push(obj);
  }
}

function fillTemplate() {
  for (let i = 0; i < ads.length; i++) {
    let fragment = PIN_TEMPLATE.cloneNode(true);
    fragment.setAttribute(`style`, `left: ${ads[i].location.x + PIN_WIDTH / 2}px; top: ${ads[i].location.y + PIN_WIDTH / 2}px`);
    fragment.querySelector(`img`).src = ads[i].author.avatar;
    fragment.querySelector(`img`).alt = ads[i].offer.title;
    fragments.push(fragment);
  }
}

function showPins() {
  for (let i = 0; i < fragments.length; i++) {
    PIN_CONTAINER.appendChild(fragments[i]);
  }
}

function loadOffers() {
  MAP.classList.remove(`map--faded`);
  fillOffers();
  fillTemplate();
  showPins();
}

loadOffers();
