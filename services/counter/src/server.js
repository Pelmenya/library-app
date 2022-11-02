import express from 'express';
import path from 'path';
import { createClient } from 'redis';

const { REDIS_URL = 'redis://localhost', PORT = 3000 } = process.env;

const client = createClient({ url: REDIS_URL });

const app = express();

(async () => await client.connect())();

app.get('/', async (req, res) => {
    res.json(`Привет`)
});

app.post('/counter/:bookId/incr', async (req, res) => {
    const { bookId } = req.params;
    const cnt = await client.incr(bookId);
    res.json(cnt);
});

app.get('/counter/:bookId', async (req, res) => {
    const { bookId } = req.params;
    const cnt = await client.get(bookId);
    res.json(cnt);
});

app.listen(Number(PORT), () => {
    console.log(`listening on port ${PORT}! (in folder ${path.resolve()}/services)`);
});


