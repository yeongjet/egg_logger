import { Logger } from 'egg-logger';
import CustomLogger from '../logger/logger';

declare module 'egg' {
  interface Context {
    log: Logger
  }
}