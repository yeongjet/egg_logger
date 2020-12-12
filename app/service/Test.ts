import { Service } from 'egg';

/**
 * Test Service
 */
export default class Test extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHi(name: string) {
    const { ctx } = this;
    // ctx.log.info('hi', 'a', 'b');
    ctx.log.warn('hello')
    ctx.log.info({name: 'ge'});
    ctx.log.verbose('ok')
    return `hi, ${name}`;
  }
}
