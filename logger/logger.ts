import { Context } from 'egg';
import { Logger } from 'egg-logger';
import { FileTransport } from './file_transport';
import { ConsoleTransport } from './console_transport';

export default (ctx: Context) => {

  const logger = new Logger({});
  logger.set(
    'file',
    new FileTransport({
      file: 'app.log',
    }, ctx),
  );
  logger.set(
    'console',
    new ConsoleTransport({
      level: 'INFO',
    }, ctx),
  );
  return logger;
};
