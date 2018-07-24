'use strict'
require('./check-versions')()
// 在process.env中添加NODE_ENV属性，表明是生产环境
process.env.NODE_ENV = 'production'

const ora = require('ora') // ora插件用于设置node命令执行过程中的提示文字及图标
const rm = require('rimraf') // 用于在node中使用UNIX命令 rm -rf
const path = require('path') // node模块，提供和文件路径相关的功能
const chalk = require('chalk') // 用来处理终端字符串的样式
const webpack = require('webpack') // webpack用于打包文件
const config = require('../config') // 导入自定义的config包
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

// 打包前先删掉上次打包的文件
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
