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
                Statistics.instance.size += 1;
                Statistics.instance.files.set(file, new FileInformation_1.FileInformation(file));
            });
        });
    }
    prettify() {
        let retVal = "{";
        retVal += `${this.size} total images present;`;
        this.files.forEach((v, k) => retVal += `{ ${k} : ${v.getResizes()} resizes}, \n`);
        retVal += "}";
        return retVal;
    }
}
exports.Statistics = Statistics;
//# sourceMappingURL=Statistics.js.map