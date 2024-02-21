export interface IWritable {
    formatAndWrite(basename:string, content: Menu):Promise<void>;
}

export interface Menu {
    [key:string]: string[][];
}