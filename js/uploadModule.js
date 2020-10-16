'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking`;

  window.upload = {
    popup: ``,
    createSuccess() {
      function removeSuccessPopup(e) {
        if (e.key === `Escape`) {
          document.querySelector(`body`).removeChild(popup);
          document.removeEventListener(`keydown`, removeSuccessPopup);
        }
      }
      const TEMPLATE = document.querySelector(`#success`);
      let popup = TEMPLATE.cloneNode(true).content.querySelector(`.success`);
      document.querySelector(`body`).appendChild(popup);
      document.addEventListener(`keydown`, removeSuccessPopup);
    },
    createError() {
      function removeSuccessPopup(e) {
        if (e.key === `Escape`) {
          document.querySelector(`main`).removeChild(popup);
          document.removeEventListener(`keydown`, removeSuccessPopup);
        }
      }
      function removeSuccessPopupClick() {
        console.log(`oo`);
        document.querySelector(`main`).removeChild(popup);
        popup.querySelector(`.error__button`).removeEventListener(`click`, removeSuccessPopupClick);
        window.removeEventListener(`click`, removeSuccessPopupClick);
      }
      const TEMPLATE = document.querySelector(`#error`);
      let popup = TEMPLATE.cloneNode(true).content.querySelector(`.error`);
      document.querySelector(`main`).appendChild(popup);
      document.addEventListener(`keydown`, removeSuccessPopup);
      popup.querySelector(`.error__button`).addEventListener(`click`, removeSuccessPopupClick);
      window.addEventListener(`click`, removeSuccessPopupClick);
    },
    send(message, onSuccess, onError) {
      let xhr = new XMLHttpRequest();
      xhr.responseType = `json`;
      xhr.setRequestHeader(`Content-Type`, `multipart/form-data`);

      xhr.open(`POST`, URL);
      xhr.send(JSON.stringify(message));

      switch (xhr.status) {
        case window.utilModule.STATUS_CODE.OK: onSuccess(); break;
        default: onError(); break;
      }
    }
  };
})();
