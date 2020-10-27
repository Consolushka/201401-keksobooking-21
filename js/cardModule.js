'use strict';

(function () {

  let featuresWrapper;
  let photosWrapper;
  const CARD_TEMPLATE = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const CARD_PHOTO_TEMPLATE = document.querySelector(`#card`).content.querySelector(`.popup__photo`);

  window.cardModule = {
    mainCard: document.querySelector(`.map__card`),
    fill(index) {
      this.create();
      let ad = window.dataModule.ads[index];
      this.mainCard.querySelector(`.popup__photos`).innerHTML = ``;
      this.mainCard.removeAttribute(`style`);
      this.mainCard.querySelector(`.popup__title`).textContent = ad.offer.title;
      this.mainCard.querySelector(`.popup__text--address`).textContent = ad.offer.address;
      this.mainCard.querySelector(`.popup__text--price`).textContent = `${ad.offer.price} ₽/ночь`;
      this.mainCard.querySelector(`.popup__type`).textContent = `${window.dataModule.roomTypeTranslator[ad.offer.type.toUpperCase()]}`;
      this.mainCard.querySelector(`.popup__text--capacity`).textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
      this.mainCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${ad.offer.checkin}, выезд\t до ${ad.offer.checkout}`;
      this.mainCard.querySelector(`.popup__description `).textContent = ad.offer.description;
      this.mainCard.querySelector(`.popup__description `).textContent = ad.offer.description;
      this.mainCard.querySelector(`.popup__avatar`).src = ad.author.avatar;
      this.refactorLists(this.mainCard);
      Object.keys(ad.offer).forEach(function (key) {
        if (ad.offer[key].length === 0) {
          switch (key) {
            case `rooms`:
            case `guests`:
              window.cardModule.mainCard.querySelector(`.popup__text--capacity`).setAttribute(`style`, `display: none`);
              break;
            default:
              window.cardModule.mainCard.querySelector(`.popup__${key}`).setAttribute(`style`, `display: none`);
              break;
          }
        }
      });
      this.fillList(featuresWrapper, `features`, ad, null);
      this.fillList(photosWrapper, `photos`, ad, CARD_PHOTO_TEMPLATE);
    },
    refactorLists(fragment) {
      featuresWrapper = fragment.querySelector(`.popup__features`);
      featuresWrapper.innerHTML = ``;
      photosWrapper = fragment.querySelector(`.popup__photos`);
      if (photosWrapper.querySelector(`.popup__photo`) !== null) {
        photosWrapper.removeChild(photosWrapper.querySelector(`.popup__photo`));
      }
    },
    fillList(wrapper, objectKey, adItem, elementTemplate) {
      for (let j = 0; j < adItem.offer[objectKey].length; j++) {
        let element;
        if (objectKey === `features`) {
          element = document.createElement(`li`);
          element.className = `popup__feature popup__feature--${adItem.offer[objectKey][j]}`;
        } else {
          element = elementTemplate.cloneNode(true);
          element.src = adItem.offer[objectKey][j];
        }
        wrapper.appendChild(element);
      }
    },
    hide() {
      if (document.querySelector(`.map`).querySelector(`.map__card`)) {
        document.querySelector(`.map`).removeChild(document.querySelector(`.map__card`));
      }
    },
    create() {
      let fragment = CARD_TEMPLATE.cloneNode(true);
      document.querySelector(`.map__filters-container`).insertAdjacentHTML(`beforebegin`, fragment.outerHTML);
      this.mainCard = document.querySelector(`.map__card`);
      this.mainCard.setAttribute(`style`, `display: none`);
    },
    closeCard() {
      window.cardModule.mainCard.setAttribute(`style`, `display: none`);
    },
    onDocumentEsc(e) {
      if (e.key === `Escape`) {
        this.closeCard();
      }
    },
    onCloseClick() {
      this.closeCard();
    }
  };

})();
