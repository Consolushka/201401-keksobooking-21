'use strict';

(function () {
  function closePopup() {
    document.querySelector(`main`).removeChild(window.upload.popup);
  }

  function removePopupEnter(e) {
    if (e.key === `Escape`) {
      closePopup();
      document.removeEventListener(`keydown`, removePopupEnter);
    }
  }


  function removePopupClick() {
    closePopup();
    window.upload.popup.querySelector(`.error__button`).removeEventListener(`click`, removePopupClick);
    window.removeEventListener(`click`, removePopupClick);
  }

  window.upload = {
    popup: ``,
    createSuccess() {
      const SUCCESS_TEMPLATE = document.querySelector(`#success`);
      this.popup = SUCCESS_TEMPLATE.cloneNode(true).content.querySelector(`.success`);
      document.querySelector(`main`).appendChild(this.popup);
      document.addEventListener(`keydown`, removePopupEnter);
      window.addEventListener(`click`, closePopup);
    },
    createError() {
      const ERROR_TEMPLATE = document.querySelector(`#error`);
      this.popup = ERROR_TEMPLATE.cloneNode(true).content.querySelector(`.error`);
      document.querySelector(`main`).appendChild(this.popup);
      document.addEventListener(`keydown`, removePopupEnter);
      this.popup.querySelector(`.error__button`).addEventListener(`click`, removePopupClick);
      window.addEventListener(`click`, removePopupClick);
    },
    send(message) {
      const URL = `https://21.javascript.pages.academy/keksobooking`;
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
