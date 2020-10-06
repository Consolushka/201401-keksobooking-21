'use strict';

const MAP = document.querySelector(`.map`);
const FORM = document.querySelector(`.ad-form`);
const MAP_FILTERS = document.querySelector(`.map__filters`);
const MAIN_PIN = document.querySelector(`.map__pin--main`);
let ads = [];
let mainCard;
let pins = [];

function openMapClick(e) {
  if (e.button === 0) {
    toggleInactiveState(true);
    document.removeEventListener(`keydown`, openMapEnter);
  }
}
function openMapEnter() {
  document.addEventListener(`keydown`, function (e) {
    if (e.key === `Enter`) {
      toggleInactiveState(true);
      MAIN_PIN.removeEventListener(`mousedown`, openMapClick);
    }
  });
}

function toggleInactiveState(isRemoving) {
  if (isRemoving) {
    MAIN_PIN.removeEventListener(`mousedown`, openMapClick);
    MAIN_PIN.removeEventListener(`focus`, openMapEnter);
    window.cardModule.createCard();
    MAP.classList.remove(`map--faded`);
    FORM.classList.remove(`ad-form--disabled`);
    FORM.querySelector(`#address`).value = `${MAIN_PIN.offsetLeft - window.utilModule.MAIN_PIN_AFTER_WIDTH / 2};${MAIN_PIN.offsetLeft - window.utilModule.MAIN_PIN_AFTER_HEIGHT / 2}`;
    loadOffers();
    window.mapModule.addPinsListener();
    window.formModule.checkCapacity();
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

function loadOffers() {
  window.dataModule.fillOffers();
  window.pinModule.loadPins();
}

toggleInactiveState(false);

MAIN_PIN.addEventListener(`mousedown`, openMapClick);

MAIN_PIN.addEventListener(`focus`, openMapEnter);

FORM.addEventListener(`change`, function (e) {
  window.formModule.checkingChanges(e);
});

FORM.addEventListener(`submit`, function (e) {
  window.formModule.checkCapacity();
});
