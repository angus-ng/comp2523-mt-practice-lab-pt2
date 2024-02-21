import { writeFile} from "fs/promises";
import { IWritable } from "./IWritable";
import { Menu } from "./IWritable";

export class HtmlWriter implements IWritable{
    private async _write (basename:string, content:string){
        return await writeFile(`${basename}.html`, content);
    }
    private _format(menuObj: Menu){
        let newMenu = "";
        
        Object.keys(menuObj).forEach((mealType) => {

        let combStr = ""; 
        for (const item in (menuObj[mealType])) { 
           let line =  menuObj[mealType][item];
            combStr = combStr + `         
                    <tr>
                        <td>${line[3]}</td>
                        <td>${line[1]}</td>
                        <td>${line[2]}</td>
                    </tr>` 
        }
        mealType = mealType[0].toUpperCase() + mealType.substring(1);
        newMenu = newMenu + `
                <th class="text-center" scope="col" colspan="3">* ${mealType} Items *</th>  ${combStr}`; 
        })

        newMenu = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Menu</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        </head>
        <body>
            <table class="table table-striped table-hover">${newMenu}
            </table>
        </body>
        </html>`
        return newMenu;

    }
    async formatAndWrite(basename:string, menuObj: Menu){
            const newContent = this._format(menuObj);
            return await this._write(basename, newContent);
    }
}
