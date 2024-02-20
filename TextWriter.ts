import { writeFile} from "fs/promises";
import { IWritable } from "./IWritable";
import { Menu } from "./IWritable";
import { EOL } from "os";


export class TextWriter implements IWritable{
    private async _write (basename: string, content: string){
        return await writeFile(`${basename}.txt`, content);
    }
    private _format(content:string[]){
        const menuObj: Menu = {};

        content.forEach((line) => {
            let menuContents = line.split(",");
            const mealType = menuContents[0];

            if (mealType in menuObj){
                menuObj[mealType].push(menuContents)
                menuObj[mealType].sort()
            } else {
                menuObj[mealType] = [];
                menuObj[mealType].push(menuContents);
            }
        })

        let newMenu = "";
        
        Object.keys(menuObj).forEach((mealType) => {

        let combStr = ""; //string for all of the items in our food type
        for (const item in (menuObj[mealType])) { 
           let line =  menuObj[mealType][item];
            combStr = combStr + `${line[3]} ${line[1]}, ${line[2]} ${EOL}` //string is cost item and quantity , new line
        }
        mealType = mealType[0].toUpperCase() + mealType.substring(1);
        newMenu = newMenu+(`* ${mealType} Items *  ${EOL}${combStr} ${EOL}`); //our output for each food type
        })

        return newMenu;

    }
    async formatAndWrite(basename: string, content: string[]){
        const newContent = this._format(content);
        return await this._write(basename, newContent);
    }
}