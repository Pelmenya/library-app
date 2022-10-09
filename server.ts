import { app } from './src/app';
import path from 'path';

const hostname = '0.0.0.0'; // сервер запустим на всех интерфейсах

const { PORT = 3000 } = process.env;

app.listen(3000, hostname, () => {
    console.log(`listening on port ${PORT}! (in folder ${path.resolve()})`);
});