"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const FileInformation_1 = require("./FileInformation");
// singleton for logging purposes
class Statistics {
    constructor() {
        this.files = new Map();
        this.size = 0;
        this.cacheSize = 0;
    }
    static getInstance() {
        if (!Statistics.instance) {
            Statistics.instance = new Statistics();
        }
        return Statistics.instance;
    }
    initialize() {
        const cwd = process.cwd();
        fs.readdir(`${cwd}/images`, (err, files) => {
            files.forEach((file) => {
                if (".DS_Store" !== file) {
                    Statistics.instance.size += 1;
                    Statistics.instance.files.set(file, new FileInformation_1.FileInformation(file, 0));
                }
            });
        });
        // const cachedImages: string[] = [];
        // fs.readdir(`${cwd}/cachedImages`, (err, files) => {
        //     files.forEach((file) => {if (".DS_Store" !== file) { cachedImages.push(file); }});
        // });
        // this.cacheSize = cachedImages.length;
    }
    cacheHit(fileName) {
        this.files.get(fileName).cacheHit();
    }
    cacheMiss(fileName) {
        this.files.get(fileName).cacheMiss();
    }
    forceRecount() {
        const cwd = process.cwd();
        // reset
        this.files = new Map();
        this.size = 0;
        const cachedImages = [];
        fs.readdir(`${cwd}/cachedImages`, (err, files) => {
            files.forEach((file) => { if (".DS_Store" !== file) {
                cachedImages.push(file);
            } });
        });
        this.cacheSize = cachedImages.length;
        fs.readdir(`${cwd}/images`, (err, files) => {
            files.forEach((file) => {
                if (".DS_Store" !== file) {
                    Statistics.instance.size += 1;
                    let cachedNbr = 0;
                    const fileNameSansExtension = (`${file}`.split("."))[0];
                    cachedImages.forEach((cImg) => {
                        if (cImg.includes(fileNameSansExtension)) {
                            cachedNbr += 1;
                        }
                    });
                    const statsInfo = new FileInformation_1.FileInformation(file, cachedNbr);
                    Statistics.instance.files.set(file, statsInfo);
                }
            });
        });
    }
    prettify() {
        let retVal = "{";
        retVal += `"total images present" : ${this.size}, \n`;
        retVal += `"total images present in cache" : ${this.cacheSize}, \n`;
        retVal += `"images" : {`;
        this.files.forEach((v, k) => {
            retVal += `"${k}" : {
                            "resizes" : ${v.getResizes()},
                            "path" : "http://localhost:8080/image/${k}",
                            "cacheHits" : ${v.getCacheHits()},
                            "cacheMisses" : ${v.getCacheMisses()}
                        },\n`;
        });
        retVal = retVal.slice(0, -2);
        retVal += "}\n}";
        return retVal;
    }
}
exports.Statistics = Statistics;
//# sourceMappingURL=Statistics.js.map