'use strict';

(function () {
  const SUCCESS_TEMPLATE = document.querySelector(`#success`);
  const ERROR_TEMPLATE = document.querySelector(`#error`);
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  function closePopup() {
    document.querySelector(`main`).removeChild(window.upload.popup);
    document.removeEventListener(`keydown`, onPopupEnter);
    window.removeEventListener(`click`, closePopup);
    window.removeEventListener(`click`, onCloseClick);
  }

  function onPopupEnter(e) {
    if (e.key === `Escape`) {
      closePopup();
    }
  }


  function onCloseClick() {
    closePopup();
    window.upload.popup.querySelector(`.error__button`).removeEventListener(`click`, onCloseClick);
  }

  window.upload = {
    popup: ``,
    createSuccess() {
      this.popup = SUCCESS_TEMPLATE.cloneNode(true).content.querySelector(`.success`);
      document.querySelector(`main`).appendChild(this.popup);
      document.addEventListener(`keydown`, onPopupEnter);
      window.addEventListener(`click`, closePopup);
    },
    createError() {
      this.popup = ERROR_TEMPLATE.cloneNode(true).content.querySelector(`.error`);
      document.querySelector(`main`).appendChild(this.popup);
      document.addEventListener(`keydown`, onPopupEnter);
      this.popup.querySelector(`.error__button`).addEventListener(`click`, onCloseClick);
      window.addEventListener(`click`, onCloseClick);
    },
    send(message) {
      let xhr = new XMLHttpRequest();
      xhr.open(`POST`, URL);

      xhr.responseType = `json`;
      xhr.send(message);

      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (xhr.status === window.utilModule.StatusCode.OK) {
            window.upload.createSuccess();
          } else {
            window.upload.createError();
          }
        }
      };
    }
  };
})();
