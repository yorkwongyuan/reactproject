const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-plugin');

function resolve(relatePath) {
    return path.join(__dirname,relatePath) // path.join()只是地址拼接
}

const webpackConfigBase = {
    entry: {
        client: resolve('../app.client.js'),
    },
    output:{
        path: resolve('../dist'),
        filename: '[name].[hash:4].js',
        chunkFilename: 'chunks/[name].[hash.4].js'
    },
    resolve:{
        extensions: ['js','.json'],
        alias: {
            '@app' : path.join(__dirname, '../app'),
            '@actions' : path.join(__dirname, '../app/redux/actions')
        }
    }
},
