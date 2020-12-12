import TracerOrigin from 'egg-tracer';
let counter = 0;
 
export class Tracer extends TracerOrigin {
  get tracerId() {
      console.log('-----------')
    return `${counter++}${Date.now()}${process.pid}`;
  }
}
