var cheerio = require("cheerio");
var ts = require("typescript");
var fs = require("fs");
var path = require("path");
function transpile(input, output, options) {
    fs.readFile(input, function (err, buffer) {
        if (err)
            throw err;
        var $ = cheerio.load(buffer.toString());
        $("script[type=\"text/typescript\"]").each(function (index, script) {
            var typescript = ts.transpile($(script).text(), options);
            $(script).text("\n" + typescript + "\n").attr("type", "text/javascript");
        });
        fs.writeFile(output, $.html());
    });
}
exports.transpile = transpile;
function transpileDirectory(inputDir, outputDir, options) {
    var mkfiles = function () {
        fs.readdir(inputDir, function (err, files) {
            if (err)
                throw err;
            for (var i = 0, len = files.length; i < len; i++) {
                (function (inputFile) {
                    var inputFilePath = path.join(inputDir, inputFile);
                    fs.stat(inputFilePath, function (err, stat) {
                        if (err)
                            throw err;
                        if (stat.isFile()) {
                            transpile(inputFilePath, path.join(outputDir, inputFile), options);
                        }
                    });
                })(files[i]);
            }
        });
    };
    fs.stat(outputDir, function (err, stat) {
        if (err) {
            fs.mkdir(outputDir, mkfiles);
        }
        else {
            mkfiles();
        }
    });
}
exports.transpileDirectory = transpileDirectory;
//# sourceMappingURL=index.js.map