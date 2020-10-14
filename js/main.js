'use strict';

const MAP = document.querySelector(`.map`);
const FORM = document.querySelector(`.ad-form`);
const MAP_FILTERS = document.querySelector(`.map__filters`);
const MAIN_PIN = document.querySelector(`.map__pin--main`);

function toggleState() {
  toggleInactiveState(false);
}

function openMapClick(e) {
  window.pinModule.mainPinDown();
  if (e.button === 0) {
    toggleInactiveState(true);
    document.removeEventListener(`keydown`, openMapEnter);
  }
}
function openMapEnter() {
  window.pinModule.mainPinDown();
  document.addEventListener(`keydown`, function (e) {
    if (e.key === `Enter`) {
      toggleInactiveState(true);
      MAIN_PIN.removeEventListener(`mousedown`, openMapClick);
    }
  });
}

function toggleInactiveState(isRemoving) {
  if (isRemoving) {
    MAP.classList.remove(`map--faded`);
    FORM.classList.remove(`ad-form--disabled`);
    MAIN_PIN.removeEventListener(`mousedown`, openMapClick);
    MAIN_PIN.removeEventListener(`focus`, openMapEnter);
    window.dataModule.fillOffers();
    window.utilModule.setAddress();
    window.formModule.checkCapacity();
    FORM.querySelector(`.ad-form__reset`).addEventListener(`click`, toggleState);
  } else {
    FORM.querySelector(`.ad-form__reset`).removeEventListener(`click`, toggleState);
    MAIN_PIN.addEventListener(`mousedown`, openMapClick);
    MAIN_PIN.addEventListener(`focus`, openMapEnter);
    window.pinModule.hidePins();
    window.dataModule.ads = [];
    if (window.utilModule.isReset === true) {
      window.mapModule.resetAll();
    } else {
      window.cardModule.createCard();
    }
    MAP.classList.add(`map--faded`);
    FORM.classList.add(`ad-form--disabled`);
    FORM.querySelector(`#address`).value = `${MAIN_PIN.offsetLeft - MAIN_PIN.clientWidth / 2};${MAIN_PIN.offsetLeft - MAIN_PIN.clientHeight / 2}`;
    MAIN_PIN.addEventListener(`mousedown`, openMapClick);
    MAIN_PIN.addEventListener(`focus`, openMapEnter);
    window.utilModule.isReset = true;
    document.removeEventListener(`mousemove`, window.pinModule.listener);
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

toggleInactiveState(false);

FORM.addEventListener(`change`, function (e) {
  window.formModule.checkingChanges(e);
});

FORM.addEventListener(`submit`, function () {
  window.formModule.checkCapacity();
});
