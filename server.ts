import { app } from './src/app';

const hostname = '0.0.0.0'; // сервер запустим на всех интерфейсах

const { PORT = 3000 } = process.env;

app.listen(3000, hostname, () => {
    console.log(`listening on port ${PORT}! (in folder ${__dirname})`);
});