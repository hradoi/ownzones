import * as fs from "fs";
import { runInThisContext } from "vm";
import { FileInformation } from "./FileInformation";

// singleton for logging purposes

export class Statistics {

    public static getInstance(): Statistics {
        if (!Statistics.instance) {
            Statistics.instance = new Statistics();
        }
        return Statistics.instance;
    }
    private static instance: Statistics;
    private size: number;
    private cacheSize: number;

    private files: Map<string, FileInformation>;

    private constructor() {
        this.files = new Map<string, FileInformation>();
        this.size = 0;
        this.cacheSize = 0;
    }

    public initialize(): void {
        const cwd = process.cwd();
        fs.readdir(`${cwd}/images`, (err, files) => {
            files.forEach((file) => {
                if (".DS_Store" !== file) {
                    Statistics.instance.size += 1;
                    Statistics.instance.files.set(file, new FileInformation(file, 0));
                }
            });
        });

        // const cachedImages: string[] = [];
        // fs.readdir(`${cwd}/cachedImages`, (err, files) => {
        //     files.forEach((file) => {if (".DS_Store" !== file) { cachedImages.push(file); }});
        // });
        // this.cacheSize = cachedImages.length;
    }

    public cacheHit(fileName: string): void {
        this.files.get(fileName).cacheHit();
    }

    public cacheMiss(fileName: string): void {
        this.files.get(fileName).cacheMiss();
    }

    public forceRecount(): void {
        const cwd = process.cwd();
        // reset
        this.files = new Map<string, FileInformation>();
        this.size = 0;
        const cachedImages: string[] = [];

        fs.readdir(`${cwd}/cachedImages`, (err, files) => {
            files.forEach((file) => {if (".DS_Store" !== file) { cachedImages.push(file); }});
        });
        this.cacheSize = cachedImages.length;

        fs.readdir(`${cwd}/images`, (err, files) => {
            files.forEach((file) => {
                if (".DS_Store" !== file) {
                    Statistics.instance.size += 1;
                    let cachedNbr: number = 0;
                    const fileNameSansExtension = (`${file}`.split("."))[0];

                    cachedImages.forEach((cImg) => {
                        if (cImg.includes(fileNameSansExtension)) {
                            cachedNbr += 1;
                        }
                    });
                    const statsInfo: FileInformation = new FileInformation(file, cachedNbr);

                    Statistics.instance.files.set(file, statsInfo);
                }
            });
        });
    }

    public prettify(): string {
        let retVal: string = "{";
        retVal += `"total images present" : ${this.size}, \n`;
        retVal += `"total images present in cache" : ${this.cacheSize}, \n`;

        retVal += `"images" : {`;
        this.files.forEach( (v, k) => {
            retVal += `"${k}" : {
                            "resizes" : ${v.getResizes()},
                            "path" : "http://localhost:8080/image/${k}",
                            "cacheHits" : ${v.getCacheHits()},
                            "cacheMisses" : ${v.getCacheMisses()}
                        },\n`;
            });
        retVal = retVal.slice(0, -2);
        retVal += "}\n}";
        return retVal;
    }
}
