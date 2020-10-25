'use strict';

(function () {

  window.filesModule = {
    adPhoto(fileChooser) {
      const PREVIEW_CONTAINER = document.querySelector(`.ad-form__photo`);
      let preview = document.createElement(`img`);
      preview.setAttribute(`height`, `70`);
      preview.setAttribute(`width`, `70`);

      if (this.readFile(fileChooser, preview)) {
        PREVIEW_CONTAINER.appendChild(preview);
      }
    },
    adAvatar(fileChooser) {
      let preview = document.querySelector(`.ad-form-header__preview`).querySelector(`img`);
      this.readFile(fileChooser, preview);
    },
    readFile(fileChooser, preview) {
      let file = fileChooser.files[0];
      let fileName = file.name.toLowerCase();
      let flag = false;

      let matches = window.utilModule.FILE_TYPES.some(function (type) {
        return fileName.endsWith(type);
      });

      if (matches) {
        let reader = new FileReader();

        reader.addEventListener(`load`, function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);

        flag = true;
      }

      return flag;
    }
  };

})();
