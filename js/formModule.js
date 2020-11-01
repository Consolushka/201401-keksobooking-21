'use strict';

const FORM = document.querySelector(`.ad-form`);
const AD_CAPACITY = FORM.querySelector(`#capacity`);
const AD_ROOMS = FORM.querySelector(`#room_number`);
const AD_TYPE = FORM.querySelector(`#type`);
const AD_PRICE = FORM.querySelector(`#price`);
const AD_TIMEIN = FORM.querySelector(`#timein`);
const AD_TIMEOUT = FORM.querySelector(`#timeout`);
const SUCCESS_TEMPLATE = document.querySelector(`#success`);
const ERROR_TEMPLATE = document.querySelector(`#error`);
const NOT_FOR_GUESTS = `0`;
const HUNDRED = `100`;
const MinPrice = {
  bungalow: `0`,
  flat: `1000`,
  house: `5000`,
  palace: `10000`
};

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
          if (option.value <= AD_ROOMS.value && option.value !== NOT_FOR_GUESTS) {
            option.removeAttribute(`disabled`);
          } else if (option.value === NOT_FOR_GUESTS && AD_ROOMS.value === HUNDRED) {
            AD_CAPACITY.querySelectorAll(`option`)[2].setAttribute(`disabled`, ``);
            option.setAttribute(`selected`, ``);
            AD_CAPACITY.setCustomValidity(``);
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
        AD_PRICE.setAttribute(`min`, MinPrice[AD_TYPE.value]);
        AD_PRICE.setAttribute(`placeholder`, MinPrice[AD_TYPE.value]);
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
    window.loadModule.send(`post`, new FormData(e.target), createSuccess, createError);
    e.preventDefault();
  },
  clear() {
    FORM.reset();
    document.querySelector(`.ad-form-header__preview`).querySelector(`img`).src = `img/muffin-grey.svg`;
    FORM.querySelector(`.ad-form__photo`).innerHTML = ``;
  }
};
