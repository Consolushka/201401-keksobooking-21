'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  let StatusCode = {
    OK: 200
  };

  window.loadModule = function (onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`GET`, URL);

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.send();
  };
})();
