import * as express from "express";
import * as rimraf from "rimraf";

import { ImageUtils } from "../logic/ImageUtils";
import { Statistics } from "../logic/Statistics";

// clear cachedImages at runtime / empty cache
// rimraf("./cachedImages", () => {});

const stats: Statistics = Statistics.getInstance();
stats.initialize();

export const register = ( app: express.Application ) => {
    // app.use("/images", express.static(__dirname + "/images"));
    const cwd = process.cwd();

    app.get( "/image/:imageName", ( req , res ) => {
        const imageName: string = req.params.imageName;
        const queryStr: string = req.query.size;
        const x: string = ImageUtils.parseImage(imageName, queryStr);
        // couldn't figure out try-catches :(
        // also thrown sync error when first loading an image
        if (x.startsWith("Error:")) {
            res.send(x);
        } else {
            res.sendFile(x);
        }
    });

    app.get("/", (req: any, res) => {
        res.redirect("/stats");
    });

    /*
    • The number of resized files.
    • Cache hits/misses.
    */
    app.get("/stats", (req: any, res) => {
        res.send(stats.prettify());
    });
};
