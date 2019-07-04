import realReact from 'react';

const fakeWindow = {};
function getWindow() {
  try {
    if (window) {
      return window;
    }
  } catch (e) {
  }
  try {
    if (global) {
      return global;
    }
  } catch (e) {
  }
  return fakeWindow;
}

const RequestQueue = {
  MAX_REQUEST: 10,
  queue: [],
  request(options) {
    this.push(options);
    this.run();
  },
  push(options) {
    this.queue.push(options);
  },
  run() {
    if (!this.queue.length) {
      return;
    }
    if (this.queue.length <= this.MAX_REQUEST) {
      let options = this.queue.shift();
      let completeFn = options.complete;
      var self = this;
      options.complete = function () {
        completeFn && completeFn.apply(null, arguments);
        self.run();
      };
      this.facade.request(options);
    }
  }
};
var more = function (api) {
  return {
    request: function (_a) {
      RequestQueue.facade = api;
      return RequestQueue.request(_a);
    },
    getStorage: function ({
      key,
      success,
      complete
    }) {
      return api.getStorage({
        key,
        complete,
        success,
        fail: function (e) {
          success && success({});
        }
      });
    }
  };
};

let React = getWindow().React = {
  createElement: realReact.createElement,
  Component: realReact.Component
};
registerAPIs(React, wx, more);

export default React;
