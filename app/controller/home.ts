import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    // ctx.log.info('hello', 'a', 'b');
    // ctx.logger.info({ name: 'agwe' });
    ctx.body = await ctx.service.test.sayHi('egg');
  }
}
