'use strict';

(function () {

  const FILTER_FORM = document.querySelector(`.map__filters`);

  const Prices = {
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

  function getCountOfAds(ads) {
    let count = 0;
    ads.forEach(function (ad) {
      if (count < 5) {
        if (ad[`matched`] > 1) {
          count++;
        }
      }
    });
    return count;
  }

  function sortByParam(ads) {
    ads.sort((a, b) => a.matched < b.matched ? 1 : -1);
    window.pinModule.load(getCountOfAds(ads));
  }

  function getTotalMatch(object) {
    object[`matched`] = 0;
    Object.keys(object[`matches`]).forEach(function (key) {
      if (key === `features`) {
        if (object[`matches`][key].length === 0) {
          object[`matched`] += 1;
        } else {
          object[`matched`] += object[`matches`][key].length + 1;
        }
      } else {
        object[`matched`] += object[`matches`][key];
      }
    });
  }
  window.renderModule = {
    change(evt) {
      switch (evt.target.name) {
        case `housing-type`:
          window.debounce(window.renderModule.simpleFilter(`type`, evt.target.value), 500);
          break;
        case `housing-guests`:
          window.renderModule.simpleFilter(`guests`, evt.target.value);
          break;
        case `housing-rooms`:
          window.renderModule.simpleFilter(`rooms`, evt.target.value);
          break;
        case `housing-price`:
          window.renderModule.filterPrice(evt.target.value);
          break;
        case `features`:
          window.debounce(window.renderModule.filterFeatures(evt.target), 500);
          break;
      }
    },
    simpleFilter(parameter, match) {
      window.cardModule.hide();
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
      window.cardModule.hide();
      window.dataModule.ads.forEach(function (ad) {
        ad[`matches`][`price`] = 0;
        if (value === `any`) {
          ad[`matches`][`price`] = 1;
        }
        if (ad.offer.price >= Prices[value].min && ad.offer.price <= Prices[value].max) {
          ad[`matches`][`price`]++;
        }
        getTotalMatch(ad);
      });
      sortByParam(window.dataModule.ads);
    },
    filterFeatures(target) {
      window.cardModule.hide();
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
    },
    removeFilters() {
      FILTER_FORM.querySelectorAll(`select`).forEach(function (select) {
        select.selectedIndex = 0;
      });
      FILTER_FORM.querySelectorAll(`fieldset`).forEach(function (field) {
        field.querySelectorAll(`input`).forEach(function (input) {
          input.removeAttribute(`checked`);
        });
      });
    }

  };
})();
