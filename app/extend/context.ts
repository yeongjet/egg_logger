import { Context } from 'egg';
import Logger from '../../logger/logger';

export default {
  // @ts-ignore
  // get log(this: Context) {
  //   return CustomLogger(this);
  // },
  get logger(this: Context) {
    // console.error('请使用ctx.log');
    return Logger(this);
    // return null;
  },
};
