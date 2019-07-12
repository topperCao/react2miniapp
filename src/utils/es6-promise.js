var g = require('./global');

if (!g) {
  console.warn('请确认关闭小程序选项 "关闭ES6转ES5"');
} else {
  if (!g.Promise) {
    // IOS 10.0.1 may cause IOS crash.
    g.Promise = require('promise-polyfill');
  }
  if (!g.regeneratorRuntime) {
    g.regeneratorRuntime = require('regenerator-runtime/runtime');
  }
}