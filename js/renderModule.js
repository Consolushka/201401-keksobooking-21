'use strict';

(function () {
  function sortByParam(arr) {
    arr.sort((a, b) => a.matched < b.matched ? 1 : -1);
  }
  window.renderModule = {
    change(e) {
      window.dataModule.ads.forEach(function (ad) {
        ad[`matched`] = 0;
      });
      switch (e.target.name) {
        case `features`:
          break;
        case `housing-type`:
          window.renderModule.filter(`type`, e.target.value);
          break;
      }
    },
    filter(parameter, match) {
      window.cardModule.hideCard();
      window.dataModule.ads.forEach(function (ad) {
        ad[`matched`] = 0;
        if (ad.offer[parameter] === match) {
          ad[`matched`]++;
        }
      });
      sortByParam(window.dataModule.ads);
      window.pinModule.loadPins(5);
    }

  };
})();
