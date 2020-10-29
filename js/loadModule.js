'use strict';

let url;
let method;

window.loadModule = {
  popup: ``,
  get(type) {
    if (type === `get`) {
      url = `https://21.javascript.pages.academy/keksobooking/data`;
    } else {
      url = `https://21.javascript.pages.academy/keksobooking`;
    }
    method = type.toUpperCase();
  },
  send(type, message, onSuccess, onError) {
    this.get(type);
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = `json`;
    if (type === `get`) {
      xhr.send();
    } else {
      xhr.send(message);
    }

    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (xhr.status === window.utilModule.StatusCode.OK) {
          onSuccess(xhr.response);
        } else {
          onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
        }
      }
    };
  }
};
