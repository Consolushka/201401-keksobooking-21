const path = require("path");
let glob = require('glob');

module.exports = {
  entry: toObject(glob.sync('js/**/*.js*')),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
    iife: true
  },
  devtool: false
}

function toObject(paths) {
  var ret = {};

  paths.forEach(function(path) {
    // you can define entry names mapped to [name] here
    ret[path.split('/').slice(-1)[0]] = path;
  });

  return ret;
}
