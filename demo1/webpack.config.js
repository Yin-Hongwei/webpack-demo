const path = require('path');

module.exports = {
    // 单个入口文件
    entry: './js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}
