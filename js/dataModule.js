'use strict';

(function () {
  let photosArr;
  let featuresArr;
  window.dataModule = {
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
            type: window.utilModule.ROOM_TYPE[i % window.utilModule.ROOM_TYPE.length],
            rooms: window.utilModule.getRandomInt(4) + 1,
            guests: window.utilModule.getRandomInt(3),
            checkin: `${window.utilModule.START_CHECKIN + window.utilModule.getRandomInt(2)}${window.utilModule.OCLOCK}`,
            checkout: `${window.utilModule.START_CHECKIN + window.utilModule.getRandomInt(2)}${window.utilModule.OCLOCK}`,
            features: window.utilModule.getRandomArr(featuresArr, window.utilModule.FEATURES_LIST, window.utilModule.getRandomInt(window.utilModule.FEATURES_LIST.length), window.utilModule.FEATURES_LIST.length),
            description: `desc${i}`,
            photos: window.utilModule.getRandomArr(photosArr, window.utilModule.PHOTOS_LIST, window.utilModule.getRandomInt(window.utilModule.PHOTOS_LIST.length), window.utilModule.PHOTOS_LIST.length)
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
