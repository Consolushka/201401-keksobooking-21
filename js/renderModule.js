'use strict';

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
  let count = [];
  ads.forEach(function (ad) {
    if (count.length < 5) {
      if (ad.matched === window.renderModule.count) {
        count.push(ad);
      }
    }
  });
  window.pinModule.load(count.length, count);
}

window.renderModule = {
  match: {
    type: -1,
    guests: -1,
    rooms: -1,
    price: -1,
    features: []
  },
  count: 0,
  change(evt) {
    switch (evt.target.name) {
      case `housing-type`:
        window.renderModule.simpleFilter(`type`, evt.target.value);
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
        evt.target.toggleAttribute(`checked`);
        window.renderModule.filterFeatures(evt.target);
        break;
    }
  },
  simpleFilter(parameter, match) {
    window.cardModule.hide();
    if (match === `any`) {
      this.match[parameter] = -1;
      this.count--;
    } else {
      if (this.match[parameter] === -1) {
        this.count++;
      }
      this.match[parameter] = match;
    }
    this.getTotalMatch();
  },
  filterPrice(value) {
    window.cardModule.hide();
    if (value === `any`) {
      this.match[`price`] = -1;
      this.count--;
    } else {
      if (this.match.price === -1) {
        this.count++;
      }
      this.match[`price`] = value;
      this.getTotalMatch();
    }
  },
  filterFeatures(target) {
    window.cardModule.hide();
    if (target.checked) {
      this.count++;
      this.match.features.push(target.value);
    } else {
      this.count--;
      this.match.features.splice(this.match.features.indexOf(target.value), 1);
    }
    this.getTotalMatch();
  },
  removeFilters() {
    FILTER_FORM.reset();
    FILTER_FORM.querySelectorAll(`fieldset`).forEach((field) => {
      field.querySelectorAll(`input`).forEach((input) => {
        input.removeAttribute(`checked`);
      });
    });
  },
  sumFeatures(key, ad) {
    window.renderModule.match[key].forEach((filteredFiture) => {
      ad.offer[key].forEach((feature) => {
        if (filteredFiture === feature) {
          ad.matched++;
        }
      });
    });
  },
  getTotalMatch() {
    window.dataModule.ads.forEach((ad) => {
      ad[`matched`] = 0;
      Object.keys(window.renderModule.match).forEach(function (key) {
        if (window.renderModule.match[key] !== -1) {
          switch (key) {
            case `price`:
              if (ad.offer[key] >= Prices[window.renderModule.match[key]].min && ad.offer[key] <= Prices[window.renderModule.match[key]].max) {
                ad.matched++;
              }
              break;
            case `features`:
              window.renderModule.sumFeatures(key, ad);
              break;
            default:
              if (ad.offer[key].toString() === window.renderModule.match[key]) {
                ad.matched++;
              }
              break;
          }
        }
      });
    });
    getCountOfAds(window.dataModule.ads);
  }
};
