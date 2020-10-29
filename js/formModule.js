'use strict';

(function () {
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
      switch (evt.target.id) {
        case `room_number`:
          AD_CAPACITY.querySelectorAll(`option`).forEach((option)=> {
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
