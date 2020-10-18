'use strict';

(function () {

  const PIN_CONTAINER = document.querySelector(`.map__pins`);

  function openCardClick(evt) {
    window.cardModule.hide();
    let pinEl = evt.target.parentElement;
    document.removeEventListener(`keydown`, openCardEnter);
    window.mapModule.pins.forEach(function (pin) {
      pin.classList.remove(`map__pin--active`);
    });
    pinEl.classList.add(`map__pin--active`);
    window.cardModule.fill(pinEl.dataset.index);
    window.cardModule.mainCard.querySelector(`.popup__close`).addEventListener(`mousedown`, window.cardModule.closeClick);
    document.addEventListener(`keydown`, window.cardModule.closeEsc);
    window.mapModule.counter++;
  }

  function openCardEnter(evt) {
    if (evt.key === `Enter`) {
      window.cardModule.hide();
      let pinEl = evt.target;
      pinEl.removeEventListener(`click`, openCardClick);
      window.cardModule.fill(pinEl.dataset.index);
      window.cardModule.mainCard.querySelector(`.popup__close`).addEventListener(`mousedown`, window.cardModule.closeClick);
      window.cardModule.mainCard.querySelector(`.popup__close`).addEventListener(`focus`, window.cardModule.closeEsc);
      window.mapModule.counter++;
    }
    document.removeEventListener(`keydown`, openCardEnter);
  }

  window.mapModule = {
    pinContainer: [],
    pins: ``,
    counter: 0,
    addPinsListener() {
      this.pins = PIN_CONTAINER.querySelectorAll(`button`);
      for (let i = 1; i < this.pins.length; i++) {
        i = i - window.mapModule.counter * 10;
        this.pins[i].addEventListener(`click`, openCardClick);
        // TODO: Исправить callback hell
        this.pins[i].addEventListener(`focus`, function () {
          document.addEventListener(`keydown`, openCardEnter);
        });
      }
    },
    resetAll() {
      window.cardModule.hide();
      window.pinModule.resetMain();
      this.pins = ``;
    }
  };
}());
