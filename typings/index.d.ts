// import { Logger } from 'egg-logger';
import { Logger } from 'winston';

declare module 'egg' {
  interface Context {
    log: Logger
  }
}