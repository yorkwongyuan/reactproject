const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const Copy = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve () {
    return path.join(__dirname, relatePath)
}

const webpackConfigProd = {
    plugins: [
        // 定义环境为生产环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('product'),
            IS_DEVELOPMENT: false
        }),
        // 将打包后的资源注入到html文件内
        new HtmlWebpackPlugin({
            template: resolve('../app/index.html'),
            mapConfig: "http://56.32.3.21/config/qdkjdsj_map_config.js"
        }),
        // 压缩代码
        new webpack.optimize.UglifyJsPlugin({
            minimize: true
        }),
        // 分析代码
        new BundleAnalyzerPlugin({
            analyzerPort: 3011
        }),
        // 拷贝代码
        new Copy([
            {from: './app/images', to: './images'}
        ])
    ]
}

module.exports = merge(webpackConfigBase, webpackConfigProd);