
import XLSX from 'xlsx';
import { IDictionary } from '@utils/types'

export function parse(file: Blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            if(!e.target) return
            const data = e.target.result;
            const workbook = XLSX.read(data, {
                type: 'binary'
            });
    
            const result: IDictionary<any> = {}
            workbook.SheetNames.forEach((sheetName: string) => {
                // Here is your object
                result[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: null })
            })
            resolve(result)
        };
    
        reader.onerror = function (ex) {
            reject(ex);
        };
    
        reader.readAsBinaryString(file);
    })
}

export function download(json: any, filename?: string) {
    const workbook = XLSX.utils.book_new()
    for(const sheet_name in json){
        XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(json[sheet_name]), sheet_name) 
    }
    XLSX.writeFile(workbook, filename || 'book1')
}

export default {
    parse,
    download
}