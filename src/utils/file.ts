const fs = require('fs');
const path = require('path');

export class File {
    static extname(filename: string): string {
        return path.extname(filename);
    }

    static getUploadPath(filename: string): string {
        return path.join(__dirname, '../..', '/storage/uploads/' + filename);
    }

    static async upload(basename: string, buffer: any) {
        return new Promise((resolve, reject) => {
            fs.writeFile(basename, buffer, function (err: any, file: any) {
                if (err) reject(err);
                resolve(file);
            }); 
        })
    }

    static async delete(basename: string) {
        return new Promise((resolve, reject) => {
            fs.unlink(basename, function (err: any) {
                if (err) reject(err);
                resolve(basename);
            }); 
        })
    }
}