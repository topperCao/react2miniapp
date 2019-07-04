const numberMap = {
  // null undefined IE6-8这里会返回[object Object]
  '[object Boolean]': 2,
  '[object Number]': 3,
  '[object String]': 4,
  '[object Function]': 5,
  '[object Symbol]': 6,
  '[object Array]': 7,
};

export const __type = Object.prototype.toString;


export function isFn(obj) {
  return __type.call(obj) === '[object Function]';
}

const fakeApp = {
  app: {
    globalData: {},
  },
};
function _getApp() {
  if (typeof getApp === 'function') {
    return getApp();
  }
  return fakeApp;
}

if (typeof getApp === 'function') {
  // 这时全局可能没有getApp
  _getApp = getApp; // esline-disabled-line
}

export { _getApp };
export function callGlobalHook(method, e) {
  const app = _getApp();
  if (app && app[method]) {
    return app[method](e);
  }
}

export function updateMiniApp(instance) {
  if (!instance || !instance.wx) {
    return;
  }
  const data = safeClone({
    props: instance.props,
    state: instance.state || null,
    context: instance.context,
  });
  instance.wx.setData(data);
}


function safeClone(originVal) {
  const temp = originVal instanceof Array ? [] : {};
  for (const item in originVal) {
    if (hasOwnProperty.call(originVal, item)) {
      const value = originVal[item];
      if (isReferenceType(value)) {
        if (value.$$typeof) {
          continue;
        }
        temp[item] = safeClone(value);
      } else {
        temp[item] = value;
      }
    }
  }
  return temp;
}

function isReferenceType(val) {
  return typeNumber(val) > 6;
}

export function typeNumber(data) {
  if (data === null) {
    return 1;
  }
  if (data === void 666) {
    return 0;
  }
  const a = numberMap[__type.call(data)];
  return a || 8;
}
