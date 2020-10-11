'use strict';

(function () {
  const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const PIN_CONTAINER = document.querySelector(`.map__pins`);
  const MAIN_PIN = document.querySelector(`.map__pin--main`);
  const MAP = document.querySelector(`.map`);

  function listener(event) {
    let margin = (document.documentElement.clientWidth - MAP.clientWidth) / 2;
    if ((event.pageX > margin) && (event.pageX < (document.documentElement.clientWidth - margin)) && (event.pageY < (MAP.clientHeight - window.utilModule.MAIN_PIN_AFTER_HEIGHT - MAIN_PIN.clientHeight))) {
      MAIN_PIN.setAttribute(`style`, `left: ${Math.ceil(event.clientX - margin - MAIN_PIN.clientWidth / 2)}px; top: ${Math.ceil(event.pageY - MAIN_PIN.clientHeight / 2)}px`);
      window.utilModule.setAddress();
    }
    document.addEventListener(`mouseup`, function () {
      document.removeEventListener(`mousemove`, listener);
      window.utilModule.setAddress();
    });
  }

  let pinFragments = [];
  window.pinModule = {
    fillPinTemplate() {
      for (let i = 0; i < window.dataModule.ads.length; i++) {
        let fragment = PIN_TEMPLATE.cloneNode(true);
        fragment.setAttribute(`style`, `left: ${window.dataModule.ads[i].location.x + window.utilModule.PIN_WIDTH / 2}px; top: ${window.dataModule.ads[i].location.y + window.utilModule.PIN_WIDTH / 2}px`);
        fragment.querySelector(`img`).src = window.dataModule.ads[i].author.avatar;
        fragment.querySelector(`img`).alt = window.dataModule.ads[i].offer.title;
        pinFragments.push(fragment);
      }
    },
    showPins() {
      for (let i = 0; i < pinFragments.length; i++) {
        PIN_CONTAINER.appendChild(pinFragments[i]);
      }
      window.mapModule.addPinsListener();
    },
    loadPins() {
      this.fillPinTemplate();
      this.showPins();
    },
    mainPinDown() {
      document.addEventListener(`mousemove`, listener);
    }
  };
}());
