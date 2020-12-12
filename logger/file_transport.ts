
import { Context } from 'egg';
import { FileTransport as FileTransportOrigin, FileTransportOptions } from 'egg-logger';
import moment from 'moment';

export class FileTransport extends FileTransportOrigin {

  private ctx: Context;

  constructor(options: FileTransportOptions, ctx: Context) {
    super(options);
    this.ctx = ctx;
  }

  log(level, args, meta) {
    const time = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
    const pid = process.pid;
    const url = this.ctx.request.url;
    const prefix = `[${time}][${level}][${pid}][${url}]`;
    // console.log('console.args');
    // console.log(args);
    if (args.length > 0) {
      args[0] = `${prefix}${args[0]}`;
    }
    if (args.length > 0) {
      const last = args.length - 1;
      args[last] += '\n';
    }
    super.log(level, args, meta);
  }
}
