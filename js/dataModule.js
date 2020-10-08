'use strict';

(function () {
  let photosArr;
  let featuresArr;
  window.dataModule = {
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
      for (let i = 1; i <= 8; i++) {
        featuresArr = [];
        photosArr = [];
        let obj = {
          author: {
            avatar: `img/avatars/user0${i}.png`
          },
          offer: {
            title: `Title${i}`,
            address: `${window.utilModule.getRandomInt(600)},${window.utilModule.getRandomInt(350)}`,
            price: window.utilModule.getRandomInt(1000),
            type: this.ROOM_TYPE[i % this.ROOM_TYPE.length],
            rooms: window.utilModule.getRandomInt(4) + 1,
            guests: window.utilModule.getRandomInt(3),
            checkin: `${window.utilModule.START_CHECKIN + window.utilModule.getRandomInt(2)}${window.utilModule.OCLOCK}`,
            checkout: `${window.utilModule.START_CHECKIN + window.utilModule.getRandomInt(2)}${window.utilModule.OCLOCK}`,
            features: window.utilModule.getRandomArr(featuresArr, this.FEATURES_LIST, window.utilModule.getRandomInt(this.FEATURES_LIST.length), this.FEATURES_LIST.length),
            description: `desc${i}`,
            photos: window.utilModule.getRandomArr(photosArr, this.PHOTOS_LIST, window.utilModule.getRandomInt(this.PHOTOS_LIST.length), this.PHOTOS_LIST.length)
          },
          location: {
            x: window.utilModule.getRandomInt(MAP.offsetWidth - window.utilModule.PIN_WIDTH),
            y: window.utilModule.PIN_LOCATION_Y_START + window.utilModule.getRandomInt(500)
          }
        };
        ads.push(obj);
      }
    }
  };
}());
