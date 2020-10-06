'use strict';

(function () {
  const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const PIN_CONTAINER = document.querySelector(`.map__pins`);
  let pinFragments = [];
  window.pinModule = {
    fillPinTemplate() {
      for (let i = 0; i < ads.length; i++) {
        let fragment = PIN_TEMPLATE.cloneNode(true);
        fragment.setAttribute(`style`, `left: ${ads[i].location.x + window.utilModule.PIN_WIDTH / 2}px; top: ${ads[i].location.y + window.utilModule.PIN_WIDTH / 2}px`);
        fragment.querySelector(`img`).src = ads[i].author.avatar;
        fragment.querySelector(`img`).alt = ads[i].offer.title;
        pinFragments.push(fragment);
      }
    },
    showPins() {
      for (let i = 0; i < pinFragments.length; i++) {
        PIN_CONTAINER.appendChild(pinFragments[i]);
      }
    },
    loadPins() {
      this.fillPinTemplate();
      this.showPins();
      pins = PIN_CONTAINER.querySelectorAll(`.map__pin`);
      console.log(pins);
    }
  };
}());
