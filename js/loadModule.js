'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const STATUS_CODE = {
    OK: 200,
    TIMEOUT: 0
  };

  window.loadModule = function (onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`GET`, URL);

    xhr.addEventListener(`load`, function () {
      if (xhr.status === STATUS_CODE.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });
    xhr.timeout = STATUS_CODE.TIMEOUT;
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      console.log(`time`);
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.open(`GET`, URL);
    xhr.send();
  };
})();
