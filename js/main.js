'use strict';

const ROOM_TYPE = [`palace`, `flat`, `house`, `bungalow`];
const FEATURES_LIST = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS_LIST = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const MAP = document.querySelector(`.map`);
const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const PIN_CONTAINER = document.querySelector(`.map__pins`);
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
        type: ROOM_TYPE[i % 4],
        rooms: getRandomInt(4),
        guests: getRandomInt(3),
        checkin: `${12 + getRandomInt(2)}+:00`,
        checkout: `${12 + getRandomInt(2)}+:00`,
        features: getRandomArr(features, FEATURES_LIST, getRandomInt(FEATURES_LIST.length), FEATURES_LIST.length),
        description: `desc${i}`,
        photos: getRandomArr(photos, PHOTOS_LIST, getRandomInt(PHOTOS_LIST.length), PHOTOS_LIST.length)
      },
      location: {
        x: getRandomInt(MAP.offsetWidth - 40),
        y: 130 + getRandomInt(500)
      }
    };
    ads.push(obj);
  }
}

function fillTemplate() {
  for (let i = 0; i < ads.length; i++) {
    let fragment = PIN_TEMPLATE.cloneNode(true);
    fragment.setAttribute(`style`, `left: ${ads[i].location.x + 20}px; top: ${ads[i].location.y + 20}px`);
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
