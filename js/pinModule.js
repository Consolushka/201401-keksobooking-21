'use strict';

const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const PIN_CONTAINER = document.querySelector(`.map__pins`);
const MAIN_PIN = document.querySelector(`.map__pin--main`);
const MAP = document.querySelector(`.map`);
const UPPER_BORDER = 74;
const LOWER_BORDER = 576;
let pinFragments = [];
const onMainPinMove = (e)=> {
  let margin = (document.documentElement.clientWidth - MAP.clientWidth) / 2;
  if ((e.pageX > margin) && (e.pageX < (document.documentElement.clientWidth - margin)) && (e.pageY < LOWER_BORDER) && (e.pageY > UPPER_BORDER)) {
    MAIN_PIN.setAttribute(`style`, `left: ${Math.ceil(e.clientX - margin - MAIN_PIN.clientWidth / 2)}px; top: ${Math.ceil(e.pageY - MAIN_PIN.clientHeight / 2)}px`);
    window.utilModule.setAddress();
  }
};
window.pinModule = {
  onMainPinDown() {
    document.addEventListener(`mousemove`, onMainPinMove);
    document.addEventListener(`mouseup`, ()=> {
      document.removeEventListener(`mousemove`, onMainPinMove);
      window.utilModule.setAddress();
    });
  },
  fillTemplate(count, ads) {
    pinFragments = [];
    for (let i = 0; i < count; i++) {
      if (ads[i].offer) {
        let fragment = PIN_TEMPLATE.cloneNode(true);
        fragment.setAttribute(`style`, `left: ${ads[i].location.x + window.utilModule.PIN_WIDTH / 2}px; top: ${ads[i].location.y + window.utilModule.PIN_WIDTH / 2}px`);
        fragment.querySelector(`img`).src = ads[i].author.avatar;
        fragment.querySelector(`img`).alt = ads[i].offer.title;
        fragment.dataset.index = i;
        pinFragments.push(fragment);
      }
    }
  },
  show(count) {
    PIN_CONTAINER.querySelectorAll(`.map__pin`).forEach((pin, i)=> {
      if (i > 0) {
        pin.parentNode.removeChild(pin);
      }
    });
    for (let i = 0; i < count; i++) {
      PIN_CONTAINER.appendChild(pinFragments[i]);
    }
    PIN_CONTAINER.querySelectorAll(`.map__pin`).forEach((pin, index)=> {
      if (index !== 0) {
        pin.classList.remove(`map__pin--hidden`);
      }
    });
    window.mapModule.addPinsListener();
  },
  resetMain() {
    MAIN_PIN.setAttribute(`style`, `left: 570px; top: 375px;`);
  },
  hide() {
    PIN_CONTAINER.querySelectorAll(`.map__pin`).forEach((pin, index)=> {
      if (index !== 0) {
        pin.classList.add(`map__pin--hidden`);
      }
    });
  },
  load(count, ads) {
    window.dataModule.newAds = [];
    window.dataModule.newAds.push(ads);
    this.fillTemplate(count, ads);
    this.show(count, ads);
  },
  mainDown() {
    MAIN_PIN.addEventListener(`mousedown`, this.onMainPinDown);
  }
};
