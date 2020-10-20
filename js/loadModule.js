'use strict';

const URL = `https://21.javascript.pages.academy/keksobooking/data`;

window.loadModule = function (onSuccess, onError) {
  let xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.open(`GET`, URL);

  xhr.addEventListener(`load`, function () {
    if (xhr.status === window.utilModule.StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });
  xhr.timeout = window.utilModule.StatusCode.TIMEOUT;
  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.send();
};
