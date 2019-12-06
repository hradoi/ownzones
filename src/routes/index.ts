import * as express from "express";
import * as fs from "fs";

import sharp from "sharp";
import { Statistics } from "./Statistics";

const stats: Statistics = Statistics.getInstance();
stats.initialize();

export const register = ( app: express.Application ) => {
    app.use("/images", express.static(__dirname + "/images"));
    const cwd = process.cwd();

    app.get( "/image/:imageName", function foo( req , res ) {
        const inputFile = `${cwd}/images/${req.params.imageName}`;

        if (!fs.existsSync(inputFile)) {
            res.send(`Input image ${req.params.imageName} doesn't exist!`);
        } else {
            if (req.query.size) {
                const queryStr: string = req.query.size;
                const splitPlace: number = queryStr.toLowerCase().indexOf("x");
                let height: number;
                let width: number;
                if ( splitPlace < 0) { // assume square
                    height = Number.parseInt(queryStr, 10);
                    width = Number.parseInt(queryStr, 10);
                } else {
                    height = Number.parseInt(queryStr.substr(0, splitPlace), 10);
                    width = Number.parseInt(queryStr.substr(splitPlace + 1, queryStr.length - splitPlace), 10);
                }

                const fileNameSansExtension = (`${req.params.imageName}`.split("."))[0];
                const outputFile = `${cwd}/cachedImages/${fileNameSansExtension}_${height}_${width}.jpg`;

                if (fs.existsSync(outputFile)) {
                    res.sendFile(outputFile);
                } else {
                    sharp(inputFile)
                        .resize({
                            fit: sharp.fit.fill,
                            height,
                            width,
                        })
                        .toFile(outputFile)
                        .then(() => res.sendFile(outputFile))
                        .catch(() => {
                                res.send(`Error occured resizing ${req.params.imageName}
                                            to specified parameters (${height},${width}))`);
                                }
                            );
                        }
            } else {
                res.sendFile(`${cwd}/images/${req.params.imageName}`);
            }
        }
    } );

    app.get("/", (req: any, res) => {
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
