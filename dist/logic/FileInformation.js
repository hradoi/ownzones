"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileInformation {
    constructor(name, resizes) {
        this.name = name;
        this.resizes = resizes;
        this.cacheHits = 0;
        this.cacheMisses = 0;
    }
    increaseResizes() {
        this.resizes += 1;
    }
    getResizes() {
        return this.resizes;
    }
    cacheHit() {
        this.cacheHits++;
    }
    cacheMiss() {
        this.cacheMisses++;
    }
    getCacheHits() {
        return this.cacheHits;
    }
    getCacheMisses() {
        return this.cacheMisses;
    }
}
exports.FileInformation = FileInformation;
//# sourceMappingURL=FileInformation.js.map