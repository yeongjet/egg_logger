import { Context } from 'egg';
import { createLogger, format, transports, config } from 'winston';
import chalk from 'chalk';
import pad from 'pad'

const { combine, printf, json } = format;

const timestamp = format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'});

interface Property {
    pid: number,
    traceId: string, 
    method: string,
    url: string,
    meta: object
}

const extractContext = (ctx: Context): Property => {
    const { request, tracer, method, meta } = ctx;
    const pid = process.pid;
    const url = request.url;
    const traceId = tracer.traceId;
    return { pid, traceId, method, url, meta }
}

const getConsoleFormat = (prop: Property) => {
    const { traceId, method, url, pid } = prop;
    return combine(
        timestamp,
        printf(({ level, message, timestamp }) => {
            if (typeof message === 'object') {
                message = JSON.stringify(message)
            }
            const lvClr = config.npm.colors[level]
            level = pad(level.toUpperCase(), 5)
            return chalk`{gray ${timestamp}} {${lvClr} ${level}} {gray ${pid}} {gray ${traceId}} {bold.gray ${method}} {gray ${url}} ${message}`;
        }),
    )
}

const getPlainFormat = (prop: Property) => {
    const { traceId, method, url, pid } = prop;
    return combine(
        timestamp,
        printf(({ level, message, timestamp }) => {
            if (typeof message === 'object') {
                message = JSON.stringify(message)
            }
            level = level.toUpperCase()
            level = pad(level.toUpperCase(), 5)
            return `${timestamp} ${level} ${pid} ${traceId} ${method} ${url} ${message}`;
        })
    )
}

const getJSONFormat = (prop: Property) => {
    return combine(
        timestamp,
        format(info => ({ ...prop, ...info }))(),
        json()
    )
}

export default (ctx: Context) => {
    const prop = extractContext(ctx)
    const [dirname, filename] = [ctx.app.config.logger.dir, ctx.app.name]
    const logger = createLogger({
        transports: [
            new transports.Console({ format: getConsoleFormat(prop) }),
            new transports.File({ format: getPlainFormat(prop), dirname, filename:`${filename}.log` }),
            new transports.File({ format: getJSONFormat(prop), dirname, filename:`${filename}.json.log` })
        ]
    });
    return logger;
};