import * as fs from "fs";
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
    private files: Map<string, FileInformation>;

    private constructor() {
        this.files = new Map<string, FileInformation>();
        this.size = 0;
    }
    public initialize(): void {
        const cwd = process.cwd();
        fs.readdir(`${cwd}/images`, (err, files) => {
            files.forEach((file) => {
                Statistics.instance.size += 1;
                Statistics.instance.files.set(file, new FileInformation(file));
            });
        });
    }

    public prettify(): string {
        let retVal: string = "{";
        retVal += `${this.size} total images present;`;
        this.files.forEach( (v, k) => retVal += `{ ${k} : ${v.getResizes()} resizes}, \n`);
        retVal += "}";
        return retVal;
    }

    // public forceRecount(): void {
    // }
}
