import { publicBooksFilesDir } from '../constants/constants';
import multer, { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, publicBooksFilesDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${uuid()}---${file.originalname}`);
    },
});

export default multer({ storage });
