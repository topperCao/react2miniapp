const React = require('react')
const _ = require('lodash')

const App = require('./app');
const Adapter = require('./render');

const h = React.createElement;

const container = {
  type: 'page_root',
  props: {},
  children: [],
  root: true,
  appendChild(child) {
    this.children.push(child);
  },
  removeChild(child) {
    _.remove(this.children, (n) => {
      return n === child;
    });
  },
};

// RootFiber
const rootinstance = Adapter.render(h(App), container);

