const path = require('path')
const babel = require('rollup-plugin-babel')
const cleanup = require('rollup-plugin-cleanup')

const rootPath = path.join(__dirname, '../')

export default {
  input: path.join(rootPath, './src/miniapp/index_wx.js'),
  output: {
    strict: false,
    file: path.join(rootPath, './dist/bundle.js'),
    format: 'es',
    name: 'React'
  },
  plugins: [
    babel(),
    cleanup(),
  ],
};

