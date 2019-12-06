"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const fs = __importStar(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const Statistics_1 = require("./Statistics");
const stats = Statistics_1.Statistics.getInstance();
stats.initialize();
exports.register = (app) => {
    app.use("/images", express.static(__dirname + "/images"));
    const cwd = process.cwd();
    app.get("/image/:imageName", function foo(req, res) {
        const inputFile = `${cwd}/images/${req.params.imageName}`;
        if (!fs.existsSync(inputFile)) {
            res.send(`Input image ${req.params.imageName} doesn't exist!`);
        }
        else {
            if (req.query.size) {
                const queryStr = req.query.size;
                const splitPlace = queryStr.toLowerCase().indexOf("x");
                let height;
                let width;
                if (splitPlace < 0) { // assume square
                    height = Number.parseInt(queryStr, 10);
                    width = Number.parseInt(queryStr, 10);
                }
                else {
                    height = Number.parseInt(queryStr.substr(0, splitPlace), 10);
                    width = Number.parseInt(queryStr.substr(splitPlace + 1, queryStr.length - splitPlace), 10);
                }
                const fileNameSansExtension = (`${req.params.imageName}`.split("."))[0];
                const outputFile = `${cwd}/cachedImages/${fileNameSansExtension}_${height}_${width}.jpg`;
                if (fs.existsSync(outputFile)) {
                    res.sendFile(outputFile);
                }
                else {
                    sharp_1.default(inputFile)
                        .resize({
                        fit: sharp_1.default.fit.fill,
                        height,
                        width,
                    })
                        .toFile(outputFile)
                        .then(() => res.sendFile(outputFile))
                        .catch(() => {
                        res.send(`Error occured resizing ${req.params.imageName}
                                            to specified parameters (${height},${width}))`);
                    });
                }
            }
            else {
                res.sendFile(`${cwd}/images/${req.params.imageName}`);
            }
        }
    });
    app.get("/", (req, res) => {
        // var dict = new Collections.Dictionary<>();
        // fs.readdir(`${cwd}/images`, (err, files) => {
        //     // const retVal: Logger[] = new Array<Logger>();
        //     const retVal = new Array();
        //     retVal.push()
        //     if (err) {
        //         retVal.push(new Logger("error", err.message));
        //     } else {
        //         files.forEach((file) => retVal.push(new Logger(file, file)));
        //     }
        //     res.send(JSON.stringify(retVal));
        // });
        res.send(stats.prettify());
    });
};
//# sourceMappingURL=index.js.map