const path = require("path");

module.exports = {
  entry: [
    "./js/utilModule.js",
    "./js/loadModule.js",
    "./js/dataModule.js",
    "./js/pinModule.js",
    "./js/debounceModule.js",
    "./js/renderModule.js",
    "./js/cardModule.js",
    "./js/formModule.js",
    "./js/fileModule.js",
    "./js/mapModule.js",
    "./js/main.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
    iife: true
  },
  devtool: false
}
