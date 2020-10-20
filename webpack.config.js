const path = require("path");

module.exports = {
  entry: [
    "./js/cardModule.js",
    "./js/dataModule.js",
    "./js/debounceModule.js",
    "./js/formModule.js",
    "./js/loadModule.js",
    "./js/mapModule.js",
    "./js/pinModule.js",
    "./js/renderModule.js",
    "./js/uploadModule.js",
    "./js/utilModule.js",
    "./js/main.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
    iife: true
  },
  devtool: false
}
