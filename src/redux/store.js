
import { create } from 'dva-core';
import models from './models';


global.app = null;

function createStore(initialState) {
  console.log(global.app, 'global.app1');
  if (!global.app) {
    if (initialState) {
      global.app = create({
        initialState,
      });
    } else {
      global.app = create({});
    }
    const isArray = Array.isArray(models);
    if (isArray) {
      models.forEach((m) => {
        global.app.model(m);
      });
    } else {
      global.app.model(models);
    }
    global.app.start();
  }
  console.log(global.app, 'global.app2');
  return global.app._store;
}


export default createStore;
