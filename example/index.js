const React = require('react')

const Com = require('./componet');
const Adapter = require('./render');

const h = React.createElement;

let container = {
  type: 'page',
  props: {},
  children: [],
  root: true,
  appendChild: () => {},
};

const instance = Adapter.render(h(Com), container);
