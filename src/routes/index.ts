import * as express from "express";
import * as fs from "fs";
const stats = {};

export const register = ( app: express.Application ) => {
    app.use("/images", express.static(__dirname + "/images"));

    const cwd = process.cwd();

    app.get( "/image/:imageName", ( req , res ) => {
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
            res.send(height + " " + width);
            // res.sendFile(`${x}/images/${req.params.imageName}`);
            // res.send( `${req.params.imageName} + ${req.query.size}` );
        } else {
            res.sendFile(`${cwd}/images/${req.params.imageName}`);
        }
    } );

    app.get("/", (req: any, res) => {
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
