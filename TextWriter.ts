import { writeFile} from "fs/promises";
import { IWritable } from "./IWritable";
import { Menu } from "./IWritable";
import { EOL } from "os";


export class TextWriter implements IWritable{
    private async _write (basename: string, content: string){
        return await writeFile(`${basename}.txt`, content);
    }
    private _format(menuObj: Menu){
        let newMenu = "";

        Object.keys(menuObj).forEach((mealType) => {
        let combStr = "";
        for (const item in (menuObj[mealType])) { 
           let line =  menuObj[mealType][item];
            combStr = combStr + `${line[3]} ${line[1]}, ${line[2]} ${EOL}`
        }
        mealType = mealType[0].toUpperCase() + mealType.substring(1);
        newMenu = newMenu+(`* ${mealType} Items *  ${EOL}${combStr} ${EOL}`);
        })

        return newMenu;

    }
    async formatAndWrite(basename: string, menuObj: Menu){
        const newContent = this._format(menuObj);
        return await this._write(basename, newContent);
    }
}