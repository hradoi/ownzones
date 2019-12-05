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
const stats = {};
exports.register = (app) => {
    app.use("/images", express.static(__dirname + "/images"));
    const cwd = process.cwd();
    app.get("/image/:imageName", (req, res) => {
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
            res.send(height + " " + width);
            // res.sendFile(`${x}/images/${req.params.imageName}`);
            // res.send( `${req.params.imageName} + ${req.query.size}` );
        }
        else {
            res.sendFile(`${cwd}/images/${req.params.imageName}`);
        }
    });
    app.get("/", (req, res) => {
        // parsed images
        res.send(`Stats for nerds!`);
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