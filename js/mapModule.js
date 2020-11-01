'use strict';

const PIN_CONTAINER = document.querySelector(`.map__pins`);

const onPinClick = (evt)=> {
  window.cardModule.hide();
  let pinEl = evt.target.parentElement;
  if (evt.target.tagName.toLowerCase() === `button`) {
    pinEl = evt.target;
  }
  document.removeEventListener(`keydown`, onPinEnter);
  window.mapModule.pins.forEach((pin)=> {
    pin.classList.remove(`map__pin--active`);
  });
  pinEl.classList.add(`map__pin--active`);
  window.cardModule.fill(pinEl.dataset.index);
  window.cardModule.mainCard.querySelector(`.popup__close`).addEventListener(`mousedown`, window.cardModule.onCloseClick);
  document.addEventListener(`keydown`, window.cardModule.onDocumentEsc);
};

const onPinEnter = (evt)=> {
  if (evt.key === `Enter`) {
    window.cardModule.hide();
    let pinEl = evt.target;
    pinEl.removeEventListener(`click`, onPinClick);
    window.cardModule.fill(pinEl.dataset.index);
    window.cardModule.mainCard.querySelector(`.popup__close`).addEventListener(`mousedown`, window.cardModule.onCloseClick);
    window.cardModule.mainCard.querySelector(`.popup__close`).addEventListener(`focus`, window.cardModule.onDocumentEsc);
  }
  document.removeEventListener(`keydown`, onPinEnter);
};

window.mapModule = {
  pinContainer: [],
  pins: ``,
  addPinsListener() {
    this.pins = PIN_CONTAINER.querySelectorAll(`button`);
    for (let i = 1; i < this.pins.length; i++) {
      this.pins[i].addEventListener(`click`, onPinClick);
      this.pins[i].addEventListener(`focus`, ()=> {
        document.addEventListener(`keydown`, onPinEnter);
      });
    }
  },
  resetAll() {
    window.cardModule.hide();
    window.pinModule.resetMain();
    this.pins = ``;
  }
};
