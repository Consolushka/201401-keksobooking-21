'use strict';

(function () {
  const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const PIN_CONTAINER = document.querySelector(`.map__pins`);
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
    },
    loadPins() {
      this.fillPinTemplate();
      this.showPins();
    }
  };
}());
