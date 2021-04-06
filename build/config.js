var path = require('path')
var nodeExternals = require('webpack-node-externals')
var Components = require('../components.json')

var externals = {}

Object.keys(Components).forEach(function (key) {
  externals[`ics-ui/packages/${key}`] = `ics-ui/lib/${key}`
})

externals = [Object.assign({
  vue: 'vue',
  'element-ui': 'element-ui',
  moment: 'moment'
}, externals), nodeExternals()]

exports.externals = externals

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  'ics-ui': path.resolve(__dirname, '../')
}

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
}

exports.jsexclude = /node_modules/
