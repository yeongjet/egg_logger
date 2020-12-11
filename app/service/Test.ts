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
    ctx.logger.info('hi', 'a', 'b');
    return `hi, ${name}`;
  }
}
