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
const fs = __importStar(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const Statistics_1 = require("../logic/Statistics");
const cwd = process.cwd();
const stats = Statistics_1.Statistics.getInstance();
class ImageUtils {
    static parseImage(imageName, querySize) {
        const fileNameSansExtension = (`${imageName}`.split("."))[0];
        const inputFile = `${cwd}/images/${imageName}`;
        if (!fs.existsSync(inputFile)) {
            return (`Error: Input image ${imageName} doesn't exist!`);
        }
        if (querySize) {
            const splitPlace = querySize.toLowerCase().indexOf("x");
            let height;
            let width;
            if (splitPlace < 0) { // assume square
                height = Number.parseInt(querySize, 10);
                width = Number.parseInt(querySize, 10);
            }
            else {
                height = Number.parseInt(querySize.substr(0, splitPlace), 10);
                width = Number.parseInt(querySize.substr(splitPlace + 1, querySize.length - splitPlace), 10);
            }
            const outputFile = `${cwd}/cachedImages/${fileNameSansExtension}_${height}_${width}.jpg`;
            if (fs.existsSync(outputFile)) {
                stats.cacheHit(imageName);
                return outputFile;
            }
            else {
                stats.cacheMiss(imageName);
                sharp_1.default(inputFile)
                    .resize({
                    fit: sharp_1.default.fit.fill,
                    height,
                    width,
                })
                    .toFile(outputFile)
                    .catch(() => {
                    return (`Error: Unable to resize ${imageName} to specified parameters (${height},${width}))`);
                });
            }
            return outputFile;
        }
        else {
            return inputFile;
        }
    }
}
exports.ImageUtils = ImageUtils;
//# sourceMappingURL=ImageUtils.js.map