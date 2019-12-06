"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileInformation {
    constructor(name) {
        this.name = name;
        this.resizes = 0;
    }
    increaseResizes() {
        this.resizes += 1;
    }
    getResizes() {
        return this.resizes;
    }
}
exports.FileInformation = FileInformation;
//# sourceMappingURL=FileInformation.js.map