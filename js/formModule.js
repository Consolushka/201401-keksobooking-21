'use strict';

(function () {
  const FORM = document.querySelector(`.ad-form`);
  window.formModule = {
    checkingChanges(e) {
      const AD_ROOMS = FORM.querySelector(`#room_number`);
      const AD_TYPE = FORM.querySelector(`#type`);
      const AD_PRICE = FORM.querySelector(`#price`);
      const AD_TIMEIN = FORM.querySelector(`#timein`);
      const AD_TIMEOUT = FORM.querySelector(`#timeout`);
      const AD_CAPACITY = FORM.querySelector(`#capacity`);
      let capacityValue = FORM.querySelector(`#capacity`).value;
      let roomsValue = FORM.querySelector(`#room_number`).value;
      // Сделано чтобы в будующем проверять и другие изменяющиеся поля
      switch (e.target.id) {
        case `room_number`:
          AD_CAPACITY.querySelectorAll(`option`).forEach(function (option) {
            option.removeAttribute(`selected`);
            option.setAttribute(`disabled`, ``);
            if (option.value === AD_ROOMS.value) {
              option.setAttribute(`selected`, ``);
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
              break;
            case `flat`:
              AD_PRICE.setAttribute(`min`, `1000`);
              break;
            case `house`:
              AD_PRICE.setAttribute(`min`, `5000`);
              break;
            case `palace`:
              AD_PRICE.setAttribute(`min`, `10000`);
              break;
          }
          break;
        case `timein`:
          AD_TIMEOUT.value = AD_TIMEIN.value;
          break;
        case `timeout`:
          AD_TIMEIN.value = AD_TIMEOUT.value;
          break;
      }
    },
    checkCapacity() {
      const AD_CAPACITY = FORM.querySelector(`#capacity`);
      let capacityValue = FORM.querySelector(`#capacity`).value;
      let roomsValue = FORM.querySelector(`#room_number`).value;
      if (capacityValue !== roomsValue) {
        AD_CAPACITY.setCustomValidity(`Значения должны быть идентичны`);
      }
    },
    submit(e) {
      console.log(new FormData(document.forms.upload));
      /*
      ad = new FormData(FORM);
       */
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
      console.log(ad[`address`]);
      window.upload.send(ad, window.upload.createSuccess, window.upload.createError);
      e.preventDefault();
    },
    clear() {
      FORM.querySelector(`#title`).textContent = ``;
    }
  };
}());
