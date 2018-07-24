'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  // 解析和加载的初始路径
  context: path.resolve(__dirname, '../'), 
  // 入口起点，指示webpack应该使用哪个模块，来作为构建起内部依赖图的开始
  entry: {
    // 输出后文件名为app.js
    app: './src/main.js'
  },
  // output可以控制webpack如何向硬盘写入编译文件
  output: {
    // 目标输出目录path的绝对路径
    path: config.build.assetsRoot,
    // 输出文件的文件名
    filename: '[name].js',
    // 公共的路径
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 设置模块如何被解析
  resolve: {
    // 自动解析确定的扩展，能够使用户在引入模块时不带扩展
    extensions: ['.js', '.vue', '.json'],
    // 创建import或者require的别名，开确保模块引入变得简单
    alias: {
      // 在给定对象的键名的末尾添加$，表示精准匹配
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  // 这些选项决定了如何处理项目中的不同类型的模块
  module: {
    // 创建模块时，匹配请求的规则数组
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        // 对resource匹配
        test: /\.vue$/,
        // 应用的loader，应用在resource上的loader数组
        loader: 'vue-loader',
        // options属性为字符串或对象，值可以传到loader中，将其理解为loader选项
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // 匹配特定条件，值为字符串或数组，exclude排除特定条件
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 将小于10KB的图片都转换为base64格式
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
