'use strict';

const URL = `https://21.javascript.pages.academy/keksobooking`;
const SUCCESS_TEMPLATE = document.querySelector(`#success`);
const ERROR_TEMPLATE = document.querySelector(`#error`);

window.upload = {
  popup: ``,
  createSuccess() {
    function removeSuccessPopup(e) {
      if (e.key === `Escape`) {
        document.querySelector(`body`).removeChild(popup);
        document.removeEventListener(`keydown`, removeSuccessPopup);
      }
    }
    let popup = SUCCESS_TEMPLATE.cloneNode(true).content.querySelector(`.success`);
    document.querySelector(`body`).appendChild(popup);
    document.addEventListener(`keydown`, removeSuccessPopup);
  },
  createError() {
    function removeSuccessPopup(evt) {
      if (evt.key === `Escape`) {
        document.querySelector(`main`).removeChild(popup);
        document.removeEventListener(`keydown`, removeSuccessPopup);
      }
    }
    function removeSuccessPopupClick() {
      document.querySelector(`main`).removeChild(popup);
      popup.querySelector(`.error__button`).removeEventListener(`click`, removeSuccessPopupClick);
      window.removeEventListener(`click`, removeSuccessPopupClick);
    }
    let popup = ERROR_TEMPLATE.cloneNode(true).content.querySelector(`.error`);
    document.querySelector(`main`).appendChild(popup);
    document.addEventListener(`keydown`, removeSuccessPopup);
    popup.querySelector(`.error__button`).addEventListener(`click`, removeSuccessPopupClick);
    window.addEventListener(`click`, removeSuccessPopupClick);
  },
  send(message, onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.open(`POST`, URL);

    xhr.responseType = `json`;
    xhr.setRequestHeader(`Content-Type`, `multipart/form-data`);
    xhr.send(JSON.stringify(message));

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === window.utilModule.StatusCode.OK) {
        onSuccess();
      } else {
        onError();
      }
    };
  }
};
