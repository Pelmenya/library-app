import { app } from './build/app.js';
import path from 'path';

const hostname = '0.0.0.0'; // сервер запустим на всех интерфейсах

const { PORT = 3000 } = process.env;

app.listen(PORT, hostname, () => {
    console.log(`listening on port ${PORT}! (in folder ${path.resolve()})`);
});
