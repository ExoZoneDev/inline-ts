import * as cheerio from "cheerio";
import * as ts from "typescript";
import * as fs from "fs";
import * as path from "path";

export function transpile(input: string, output: string, options: ts.CompilerOptions) {
  fs.readFile(input, function (err, buffer) {
    if (err) throw err;
    let $ = cheerio.load(buffer.toString());
    $(`script[type="text/typescript"]`).each(function (index, script) {
      let typescript = ts.transpile($(script).text(), options);
      $(script).text(`\n${typescript}\n`).attr("type", "text/javascript");
    });
    fs.writeFile(output, $.html());
  });
}

export function transpileDirectory(inputDir: string, outputDir: string, options: ts.CompilerOptions) {
  let mkfiles = function () {
    fs.readdir(inputDir, function (err, files) {
      if (err) throw err;
      for (let i = 0, len = files.length; i < len; i++) {
        (function (inputFile: string) {
          let inputFilePath = path.join(inputDir, inputFile);
          fs.stat(inputFilePath, function (err, stat) {
            if (err) throw err;
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
    } else {
      mkfiles();
    }
  });
}
