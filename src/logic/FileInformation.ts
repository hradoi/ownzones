export class FileInformation {
    public resizes: number;
    private name: string;
    private cacheHits: number;
    private cacheMisses: number;

    constructor(name: string, resizes: number) {
        this.name = name;
        this.resizes = resizes;
        this.cacheHits = 0;
        this.cacheMisses = 0;
    }

    public increaseResizes(): void {
        this.resizes += 1;
    }

    public getResizes(): number {
        return this.resizes;
    }

    public cacheHit(): void {
        this.cacheHits++;
    }

    public cacheMiss(): void {
        this.cacheMisses++;
    }

    public getCacheHits(): number {
        return this.cacheHits;
    }

    public getCacheMisses(): number {
        return this.cacheMisses;
    }
}
