import { Context } from 'egg';
// import Logger from '../../logger/logger';
import Logger from '../../logger/winston';
export default {
  // @ts-ignore
  // get log(this: Context) {
  //   return CustomLogger(this);
  // },
  get log(this: Context) {
    // console.error('请使用ctx.log');
    return Logger(this);
    // return null;
  },
};
