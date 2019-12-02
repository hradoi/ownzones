import * as express from "express";
import * as fs from "fs";
// fs.readFile process.cwd()

export const register = ( app: express.Application ) => {
    app.use("/images", express.static(__dirname + "/images"));

    app.get( "/image/:imageName", ( req , res ) => {
        if (req.query.size) {
            res.send( `${req.params.imageName} + ${req.query.size}` );
        } else {
            res.send("normal image");
        }
    } );

    app.get("/", (req: any, res) => {
        const items = [
            {name : "Ala" },
            {name : "Bala"}
        ];
        res.render("index", {items});
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
