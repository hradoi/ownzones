"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImageUtils_1 = require("../logic/ImageUtils");
const Statistics_1 = require("../logic/Statistics");
// clear cachedImages at runtime / empty cache
// rimraf("./cachedImages", () => {});
const stats = Statistics_1.Statistics.getInstance();
stats.initialize();
exports.register = (app) => {
    // app.use("/images", express.static(__dirname + "/images"));
    const cwd = process.cwd();
    app.get("/image/:imageName", (req, res) => {
        const imageName = req.params.imageName;
        const queryStr = req.query.size;
        const x = ImageUtils_1.ImageUtils.parseImage(imageName, queryStr);
        // couldn't figure out try-catches :(
        // also thrown sync error when first loading an image
        if (x.startsWith("Error:")) {
            res.send(x);
        }
        else {
            res.sendFile(x);
        }
    });
    app.get("/", (req, res) => {
        res.redirect("/stats");
    });
    /*
    • The number of resized files.
    • Cache hits/misses.
    */
    app.get("/stats", (req, res) => {
        res.send(stats.prettify());
    });
};
//# sourceMappingURL=index.js.map