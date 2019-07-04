/* eslint-disable func-names */
import { isFn, callGlobalHook, _getApp } from './utils';
import { onLoad } from './registerPage.all';


const globalHooks = {
  onShare: 'onGlobalShare',
  onShow: 'onGlobalShow',
  onHide: 'onGlobalHide',
};

export function registerPage(PageClass, path, testObject) {
  PageClass.reactInstances = [];
  const config = {
    data: {},
    onLoad(query) {
      onLoad.call(this, PageClass, path, query);
    },
  };

  ['onPageScroll',
    'onShareAppMessage',
    'onReachBottom',
    'onPullDownRefresh',
    'onResize',
    'onShow',
    'onHide',
  ].forEach((hook) => {
    config[hook] = function (e) {
      const instance = this.reactInstance;
      let fn = instance[hook];
      let param = e;
      if (hook === 'onShareAppMessage') {
        hook = 'onShare';
        fn = fn || instance[hook];
      } else if (hook === 'onShow') {
        if (this.options) { // 支付宝小程序不存在this.options
          instance.props.query = this.options;
        }
        param = instance.props.query;
        // 在百度小程序，从A页面跳转到B页面，模拟器下是先触发A的onHide再触发B的onShow
        // 真机下，却是先触发B的onShow再触发A的onHide,其他小程序可能也有这问题，因此我们只在onShow
        // 里修改全局对象的属性
        _getApp().$$page = this;
        _getApp().$$pagePath = instance.props.path;
      }
      let ret;
      if (isFn(fn)) { // 页面级别
        ret = fn.call(instance, param);
        if (hook === 'onShare') {
          return ret;
        }
      }
      const globalHook = globalHooks[hook];
      if (globalHook) { // 应用级别
        ret = callGlobalHook(globalHook, param);
        if (hook === 'onShare') {
          return ret;
        }
      }
    };
  });

  if (testObject) {
    config.setData = (obj) => {
      config.data = obj;
    };
    config.onLoad({ testQuery: 1 });
    return config;
  }
  return config;
}
