import { writeFile} from "fs/promises";
import { IWritable } from "./IWritable";
import { Menu } from "./IWritable";
import { EOL } from "os";

export class HtmlWriter implements IWritable{
    private async _write (basename:string, content:string){
        return await writeFile(`${basename}.html`, content);
    }
    private _format(content:string[]){
        const menuObj: Menu = {};

        content.forEach((line) => {
            let menuContents = line.split(",");
            const mealType = menuContents[0];

            if (mealType in menuObj){
                menuObj[mealType].push(menuContents)
            } else {
                menuObj[mealType] = [];
                menuObj[mealType].push(menuContents);
            }
            menuObj[mealType].sort()
        })

        let newMenu = "";
        
        Object.keys(menuObj).forEach((mealType) => {

        let combStr = ""; //string for all of the items in our food type
        for (const item in (menuObj[mealType])) { 
           let line =  menuObj[mealType][item];
            combStr = combStr + `<tr><td>${line[3]}</td><td>${line[1]}</td><td>${line[2]}</td></tr>` //string is cost item and quantity , new line
        }
        mealType = mealType[0].toUpperCase() + mealType.substring(1);
        newMenu = newMenu+(`<th>* ${mealType} Items * ${combStr}</th>`); //our output for each food type
        })

        newMenu = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <table>
                ${newMenu}
            </table>
        </body>
        </html>`
        return newMenu;

    }
    async formatAndWrite(basename:string, content: string[]){
            const newContent = this._format(content);
            return await this._write(basename, newContent);
    }
}
