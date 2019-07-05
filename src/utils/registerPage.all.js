
import { createElement } from 'react';

import { _getApp, updateMiniApp, callGlobalHook } from './utils';
import Adapter from '../Adapter/index';

const noop = () => {};

export function onLoad(PageClass, path, query) {
  const app = _getApp();
  app.$$pageIsReady = false;
  app.$$page = this;
  app.$$pagePath = path;
  const container = {
    type: 'page',
    props: {},
    children: [],
    root: true,
    appendChild: noop,
  };
  const pageInstance = Adapter.render(// 生成页面的React对象
    createElement(PageClass, {
      path,
      query,
      isPageComponent: true,
    }),
    container,
  );
  callGlobalHook('onGlobalLoad');// 调用全局onLoad方法
  this.reactContainer = container;
  this.reactInstance = pageInstance;
  pageInstance.wx = this;// 保存小程序的页面对象
  updateMiniApp(pageInstance);// 更新小程序视图
  return pageInstance;
}
