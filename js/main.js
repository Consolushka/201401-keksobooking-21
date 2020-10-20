'use strict';

const MAP = document.querySelector(`.map`);
const SUBMIT_FORM = document.querySelector(`.ad-form`);
const FILTER_FORM = document.querySelector(`.map__filters`);
const MAP_FILTERS = document.querySelector(`.map__filters`);
const MAIN_PIN = document.querySelector(`.map__pin--main`);

function toggleState() {
  toggleInactiveState(false);
}

function openMapClick(evt) {
  window.pinModule.mainDown();
  if (evt.button === 0) {
    toggleInactiveState(true);
    document.removeEventListener(`keydown`, openMapEnter);
  }
}

function submitForm(evt) {
  window.formModule.submit(evt);
  toggleInactiveState(false);
}

function openMapEnter() {
  window.pinModule.mainDown();
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
    SUBMIT_FORM.classList.remove(`ad-form--disabled`);
    MAIN_PIN.removeEventListener(`mousedown`, openMapClick);
    MAIN_PIN.removeEventListener(`focus`, openMapEnter);
    window.dataModule.fillOffers();
    window.utilModule.setAddress();
    window.formModule.checkCapacity();
    SUBMIT_FORM.addEventListener(`submit`, submitForm);
    SUBMIT_FORM.querySelector(`.ad-form__reset`).addEventListener(`click`, toggleState);
    FILTER_FORM.addEventListener(`change`, window.debounce(window.renderModule.change));
    window.cardModule.create();
  } else {
    window.renderModule.removeFilters();
    window.formModule.clear();
    SUBMIT_FORM.querySelector(`.ad-form__reset`).removeEventListener(`click`, toggleState);
    MAIN_PIN.addEventListener(`mousedown`, openMapClick);
    MAIN_PIN.addEventListener(`focus`, openMapEnter);
    window.pinModule.hide();
    window.dataModule.ads = [];
    if (window.utilModule.isReset === true) {
      window.mapModule.resetAll();
    }
    // else {
    //   window.cardModule.createCard();
    // }
    MAP.classList.add(`map--faded`);
    SUBMIT_FORM.classList.add(`ad-form--disabled`);
    SUBMIT_FORM.querySelector(`#address`).value = `${MAIN_PIN.offsetLeft - MAIN_PIN.clientWidth / 2};${MAIN_PIN.offsetLeft - MAIN_PIN.clientHeight / 2}`;
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

SUBMIT_FORM.addEventListener(`change`, function (evt) {
  window.formModule.checkingChanges(evt);
});

SUBMIT_FORM.addEventListener(`submit`, function () {
  window.formModule.checkCapacity();
});
