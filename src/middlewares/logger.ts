import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import os from 'os';
import path from 'path';


export default (req: Request, res: Response, next: NextFunction) => {
    const { url, method } = req;

    const logsDir = 'logs';
    const logFilelName = 'server.log';
    const dirLogs = path.join(__dirname, '../..', logsDir);
    const fileName = path.join(dirLogs, logFilelName);

    const now =  Date.now();
    const data = `${now} ${method} ${url}`;

    fs.access(dirLogs, (errDir) => {
        if (errDir && errDir.code === 'ENOENT') {
            fs.mkdir(dirLogs, () => { });
            fs.appendFile(fileName, data + os.EOL, (errFile) => {
                if (errFile) throw errFile;
            });
        } else {
            fs.readdir(dirLogs, (errDirRead) => {
                if (errDirRead) {
                    throw errDirRead;
                } else {
                    fs.appendFile(fileName, data + os.EOL, (errFile) => {
                        if (errFile) throw errFile;
                    });
                }
            });
        }
    });

    next();
};