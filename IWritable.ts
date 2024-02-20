export interface IWritable {
    formatAndWrite(basename:string, content: string[]):Promise<void>;
}

export interface Menu {
    [key:string]: string[][];
}