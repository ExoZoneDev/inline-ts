var path = require("path");

var tsInline = require("../index.js");

tsInline.transpile(path.join(__dirname, "test.html"), path.join(__dirname, "test.built.html"), {
  inlineSourceMap: true
});

tsInline.transpileDirectory(path.join(__dirname, "input"), path.join(__dirname, "output"), {
  inlineSourceMap: true
});
