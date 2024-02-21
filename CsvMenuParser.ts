import { readFile } from "fs/promises";
import { IWritable } from "./IWritable";
import { EOL } from "os";
import { HtmlWriter } from "./HtmlWriter";
import { TextWriter } from "./TextWriter";
import { basename, extname } from "path";
import { Menu } from "./IWritable";


class CsvMenuParser {
    private _csvObj: Menu;
    private _basename: string = "";
    private constructor(menuObj:Menu, basename:string) {
        this._csvObj = menuObj;
        this._basename = basename;
    }

    static async buildMenu(filename: string) {
        const data = await readFile(filename, "utf-8");
        const menuObj = this._dataToObj(data.split(EOL));
        return new CsvMenuParser(menuObj, basename(filename, extname(filename)))
    }

    private static _dataToObj(data: string[]){
        const menuObj: Menu = {};

        data.forEach((line) => {
            let menuContents = line.split(",");
            const mealType = menuContents[0];

            if (!(mealType in menuObj)){
                menuObj[mealType] = [];
            }
            menuObj[mealType].push(menuContents);
            menuObj[mealType].sort()
        })

        return menuObj;
    }
    
    get csvObj(): Menu {
        return this._csvObj;
    }

    get basename(): string{
        return this._basename;
    }

    public async writeMenu(writer: IWritable) {
        try {
            await writer.formatAndWrite(this.basename, this.csvObj);
            console.log("Wrote to file");
        } catch (err){
            console.log(err);
        }
    }

}
async function main() {
    const menu = await CsvMenuParser.buildMenu("menu.csv");
    menu.writeMenu(new HtmlWriter());
    menu.writeMenu(new TextWriter());
    console.log(menu.csvObj)
}

main();