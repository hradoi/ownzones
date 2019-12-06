export class FileInformation {
    public resizes: number;
    private name: string;
    constructor(name: string) {
        this.name = name;
        this.resizes = 0;
    }
    public increaseResizes(): void {
        this.resizes += 1;
    }

    public getResizes(): number {
        return this.resizes;
    }
}
