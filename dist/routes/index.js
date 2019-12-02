"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
// fs.readFile process.cwd()
exports.register = (app) => {
    app.use("/images", express.static(__dirname + "/images"));
    app.get("/image/:imageName", (req, res) => {
        if (req.query.size) {
            res.send(`${req.params.imageName} + ${req.query.size}`);
        }
        else {
            res.send("normal image");
        }
    });
    app.get("/", (req, res) => {
        const items = [
            { name: "Ala" },
            { name: "Bala" }
        ];
        res.render("index", { items });
    });
};
/*

sharp(inputFile).resize({ height: 1560, width: 1600 }).toFile(outputFile)
    .then(function(newFileInfo) {
        console.log("Success");
    })
    .catch(function(err) {
        console.log("Error occured");
    });

*/
//# sourceMappingURL=index.js.map