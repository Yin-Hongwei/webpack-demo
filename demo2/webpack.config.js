const path = require('path');

module.exports = {
    // 多个入口文件
    entry: {
        index1: './js/index1.js',
        index2: './js/index2.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}