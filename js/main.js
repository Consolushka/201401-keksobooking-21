'use strict';

const MAP = document.querySelector(`.map`);
const SUBMIT_FORM = document.querySelector(`.ad-form`);
const FILTER_FORM = document.querySelector(`.map__filters`);
const MAP_FILTERS = document.querySelector(`.map__filters`);
const MAIN_PIN = document.querySelector(`.map__pin--main`);

const toggleState = ()=> {
  toggleInactiveState(false);
};

const openMap = ()=>{
  toggleInactiveState(true);
  document.removeEventListener(`keydown`, onMainPinEnter);
  MAIN_PIN.removeEventListener(`mousedown`, onMainPinClick);
};

const onMainPinClick = (evt)=>{
  window.pinModule.mainDown();
  if (evt.button === 0) {
    openMap();
  }
};

const submitForm = (evt)=>{
  window.formModule.submit(evt);
  toggleInactiveState(false);
  SUBMIT_FORM.removeEventListener(`submit`, submitForm);
};

const onMainPinEnter = ()=>{
  window.pinModule.mainDown();
  document.addEventListener(`keydown`, (e)=> {
    if (e.key === `Enter`) {
      openMap();
    }
  });
};

const toggleInactiveState = (isRemoving)=>{
  if (isRemoving) {
    MAP.classList.remove(`map--faded`);
    SUBMIT_FORM.classList.remove(`ad-form--disabled`);
    MAIN_PIN.removeEventListener(`mousedown`, onMainPinClick);
    MAIN_PIN.removeEventListener(`focus`, onMainPinEnter);
    window.pinModule.mainDown();
    window.dataModule.fillOffers();
    window.utilModule.setAddress();
    window.formModule.checkCapacity();
    SUBMIT_FORM.addEventListener(`submit`, submitForm);
    SUBMIT_FORM.querySelector(`.ad-form__reset`).addEventListener(`click`, toggleState);
    FILTER_FORM.addEventListener(`change`, window.debounceModule(window.renderModule.change));

    SUBMIT_FORM.addEventListener(`change`, (evt)=> {
      window.formModule.checkingChanges(evt);
    });

    FILTER_FORM.querySelectorAll(`.map__checkbox`).forEach((checkbox)=> {
      checkbox.addEventListener(`focus`, (check)=> {
        checkbox.addEventListener(`keydown`, (evt)=> {
          if (evt.key === `Enter`) {
            checkbox.toggleAttribute(`checked`);
            window.renderModule.change(check);
          }
        });
      });
    });

    SUBMIT_FORM.addEventListener(`submit`, ()=> {
      window.formModule.checkCapacity();
    });
  } else {
    window.renderModule.removeFilters();
    window.formModule.clear();
    SUBMIT_FORM.querySelector(`.ad-form__reset`).removeEventListener(`click`, toggleState);
    window.pinModule.hide();
    window.dataModule.ads = [];
    if (window.utilModule.isReset) {
      window.mapModule.resetAll();
    }
    MAP.classList.add(`map--faded`);
    SUBMIT_FORM.classList.add(`ad-form--disabled`);
    SUBMIT_FORM.querySelector(`#address`).value = `${Math.trunc(MAIN_PIN.offsetLeft - MAIN_PIN.clientWidth / 2)},${Math.trunc(MAIN_PIN.offsetLeft - MAIN_PIN.clientHeight / 2)}`;
    MAIN_PIN.addEventListener(`mousedown`, onMainPinClick);
    MAIN_PIN.addEventListener(`focus`, onMainPinEnter);
    window.utilModule.isReset = true;
    document.removeEventListener(`mousemove`, window.pinModule.onMainPinDown);
  }
  document.querySelector(`.notice`).querySelectorAll(`fieldset`).forEach((field)=> {
    field.toggleAttribute(`disabled`);
  });

  MAP_FILTERS.toggleAttribute(`disabled`);

  MAP_FILTERS.classList.toggle(`map__filters--disabled`);

  MAP_FILTERS.querySelectorAll(`select`).forEach((field)=> {
    field.toggleAttribute(`disabled`);
  });
};

toggleInactiveState(false);
