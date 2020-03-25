const path = require('path')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV == 'development'

const config = {
    entry: path.resolve(__dirname, "js/index.js"), // 入口文件
    output: {
        filename: "build.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"',
            }
        }),
        new HTMLPlugin(),
    ],
}

if (isDev) {
    config.devtool = '#cheap-module-eval-source-map',
        config.devServer = {
            port: 8000,
            host: 'localhost',
            overlay: {
                errors: true
            },
            open: true  //每次都打开一个网页
            // hot: true //只渲染一个组件
        }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    )
}

module.exports = config
