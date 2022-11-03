import request from 'request';

const url = String(process.env.COUNTER_URL || 'localhost:3001');

export const postCountViewBook = (bookId: string, cb: (cnt: number) => void) => {
    // не получилось через http.request

    const options = {
        url: `${url}/counter/${bookId}/incr`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        json: true,
        time: true,
    };

    request(options, (err, res, body) => {
        const { statusCode } = res;
        if (statusCode && !err) {
            if (statusCode >= 200 || statusCode < 300) {
                cb(Number(body));
            }
        }
        if (err) {
            console.log(err);
        }
    });
};