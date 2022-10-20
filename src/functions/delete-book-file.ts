import fs from 'fs';

export const deleteBookFile = (file: string) => {
    fs.unlink(file, (err) => {
        if (err && err.code == 'ENOENT') {
            console.info('File doesn`t exist, won`t remove it.');
        } else if (err) {
            console.error('Error occurred while trying to remove file');
        }
    }); 
};