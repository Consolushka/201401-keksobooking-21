'use strict';


function removeSuccessPopup(e) {
  if (e.key === `Escape`) {
    document.querySelector(`main`).removeChild(window.upload.popup);
    document.removeEventListener(`keydown`, removeSuccessPopup);
  }
}


function removeSuccessPopupClick() {
  document.querySelector(`main`).removeChild(window.upload.popup);
  window.upload.popup.querySelector(`.error__button`).removeEventListener(`click`, removeSuccessPopupClick);
  window.removeEventListener(`click`, removeSuccessPopupClick);
}

window.upload = {
  popup: ``,
  createSuccess() {
    const SUCCESS_TEMPLATE = document.querySelector(`#success`);
    this.popup = SUCCESS_TEMPLATE.cloneNode(true).content.querySelector(`.success`);
    document.querySelector(`main`).appendChild(this.popup);
    document.addEventListener(`keydown`, removeSuccessPopup);
  },
  createError() {
    const ERROR_TEMPLATE = document.querySelector(`#error`);
    this.popup = ERROR_TEMPLATE.cloneNode(true).content.querySelector(`.error`);
    document.querySelector(`main`).appendChild(this.popup);
    document.addEventListener(`keydown`, removeSuccessPopup);
    this.popup.querySelector(`.error__button`).addEventListener(`click`, removeSuccessPopupClick);
    window.addEventListener(`click`, removeSuccessPopupClick);
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
