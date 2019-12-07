import e = require("express");
import * as fs from "fs";
import sharp from "sharp";
import { Statistics } from "../logic/Statistics";

const cwd = process.cwd();
const stats: Statistics = Statistics.getInstance();

export class ImageUtils {

    public static parseImage(imageName: string, querySize: string ): string {
        const fileNameSansExtension = (`${imageName}`.split("."))[0];
        const inputFile: string = `${cwd}/images/${imageName}`;

        if (!fs.existsSync(inputFile)) {
            return(`Error: Input image ${imageName} doesn't exist!`);
        }

        if (querySize) {
            const splitPlace: number = querySize.toLowerCase().indexOf("x");
            let height: number;
            let width: number;
            if ( splitPlace < 0) { // assume square
                height = Number.parseInt(querySize, 10);
                width = Number.parseInt(querySize, 10);
            } else {
                height = Number.parseInt(querySize.substr(0, splitPlace), 10);
                width = Number.parseInt(querySize.substr(splitPlace + 1, querySize.length - splitPlace), 10);
            }

            const outputFile = `${cwd}/cachedImages/${fileNameSansExtension}_${height}_${width}.jpg`;

            if (fs.existsSync(outputFile)) {
                stats.cacheHit(imageName);
                return outputFile;
            } else {
                stats.cacheMiss(imageName);
                sharp(inputFile)
                    .resize({
                        fit: sharp.fit.fill,
                        height,
                        width,
                    })
                    .toFile(outputFile)
                    .catch(() => {
                      return (`Error: Unable to resize ${imageName} to specified parameters (${height},${width}))`);
                            }
                        );
                    }
            return outputFile;
        } else {
            return inputFile;
        }
    }
}
