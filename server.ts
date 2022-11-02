import { app } from './src/app';

const { PORT = 3000 } = process.env;

app.listen(Number(PORT), () => {
    console.log(`listening on port ${PORT}! (in folder ${__dirname})`);
});