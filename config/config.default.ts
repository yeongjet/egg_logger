import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
// import { Tracer } from '../logger/tracer';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;
  config.logger = {
    appLogName: `${appInfo.name}.log`,
  };
  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  // config.tracer = {
  //   Class: Tracer
  // };
  // config.tracer = {
  //   Class: require('../logger/tracer.js')
  // };
  config.keys = appInfo.name + '_1607654939304_4357';

  // add your egg config in here
  config.middleware = [];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
