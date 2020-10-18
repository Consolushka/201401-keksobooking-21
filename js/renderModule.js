'use strict';

(function () {
  function getCountOfAds(arr) {
    let count = 0;
    arr.forEach(function (ad) {
      if (count < 5) {
        if (ad[`matched`] > 0) {
          count++;
        }
      }
    });
    return count;
  }

  function sortByParam(arr) {
    arr.sort((a, b) => a.matched < b.matched ? 1 : -1);
    window.pinModule.loadPins(getCountOfAds(arr));
  }

  function getTotalMatch(object) {
    object[`matched`] = 0;
    Object.keys(object[`matches`]).forEach(function (key) {
      if (key === `features`) {
        if (object[`matches`][key].length === 0) {
          object[`matched`] += 1;
        } else {
          object[`matched`] += object[`matches`][key].length;
        }
      } else {
        object[`matched`] += object[`matches`][key];
      }
    });
  }

  const PRICES = {
    any: {
      min: Number.NEGATIVE_INFINITY,
      max: Number.POSITIVE_INFINITY
    },
    middle: {
      min: 10000,
      max: 50000
    },
    low: {
      min: Number.NEGATIVE_INFINITY,
      max: 10000
    },
    high: {
      min: 50000,
      max: Number.POSITIVE_INFINITY
    }
  };
  window.renderModule = {
    change(e) {
      switch (e.target.name) {
        case `housing-type`:
          window.debounce(window.renderModule.simpleFilter(`type`, e.target.value), 500);
          break;
        case `housing-guests`:
          window.renderModule.simpleFilter(`guests`, e.target.value);
          break;
        case `housing-rooms`:
          window.renderModule.simpleFilter(`rooms`, e.target.value);
          break;
        case `housing-price`:
          window.renderModule.filterPrice(e.target.value);
          break;
        case `features`:
          window.debounce(window.renderModule.filterFeatures(e.target), 500);
          break;
      }
    },
    simpleFilter(parameter, match) {
      window.cardModule.hideCard();
      window.dataModule.ads.forEach(function (ad) {
        if (match === `any`) {
          ad[`matches`][parameter] = 1;
        } else {
          ad[`matches`][parameter] = 0;
          if (ad.offer[parameter].toString() === match) {
            ad[`matches`][parameter]++;
          }
        }
        getTotalMatch(ad);
      });
      sortByParam(window.dataModule.ads);
    },
    filterPrice(value) {
      window.cardModule.hideCard();
      window.dataModule.ads.forEach(function (ad) {
        ad[`matches`][`price`] = 0;
        if (value === `any`) {
          ad[`matches`][`price`] = 1;
        }
        if (ad.offer.price >= PRICES[value].min && ad.offer.price <= PRICES[value].max) {
          ad[`matches`][`price`]++;
        }
        getTotalMatch(ad);
      });
      sortByParam(window.dataModule.ads);
    },
    filterFeatures(target) {
      window.cardModule.hideCard();
      window.dataModule.ads.forEach(function (ad) {
        ad.offer.features.forEach(function (feature) {
          if (feature === target.value) {
            if (target.checked) {
              ad[`matches`][`features`].push(feature);
            } else {
              ad[`matches`][`features`].splice(ad[`matches`][`features`].indexOf(feature), 1);
            }
          }
        });
        getTotalMatch(ad);
      });
      sortByParam(window.dataModule.ads);
    }

  };
})();
