## 前言

[为什么用webpack]([https://yin-hongwei.github.io/2020/03/18/%E4%B8%BA%E4%BB%80%E4%B9%88%E7%94%A8webpack/](https://yin-hongwei.github.io/2020/03/18/为什么用webpack/))



## 安装

创建一个项目，进入该项目安装 webpack。

```bash
npm init -y # 创建 package.json 文件

npm install webpack webpack-cli -D # 局部安装 webpack
```

创建 webpack 的配置文件 webpack.config.js。接下来的 demo 都是在这个的基础上进行。



## 一、entry, output

### Demo1: entry, output (单个入口文件) => (source)

> 说明：创建一个 html 和 js 文件，js 文件随便输出点东西，html 文件中引入 webpack 打包后的 js 文件。

index.html

```html
<body>
    <script src="./dist/bundle.js"></script>
</body>
```

index.js

```js
document.write('<h1>Hello World</h1>');
```

 webpack.config.js

```js
const path = require('path');

module.exports = {
    entry: './js/index.js', // 入口文件路径
    output: {
        filename: 'bundle.js', // 打包后文件名字
        path: path.resolve(__dirname, 'dist') // 打包后文件路径
    }
}
```

为了开发便利，配一下打包命令，在 package.json 文件中的 scripts 中添加最下面一行（你也可以换个名字，不叫 build），这样打包时候直接 npm run build 就行了。

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "node_modules/.bin/webpack"
  },
```

浏览器打开 html 文件查看效果😄。



### Demo2: entry, output (多个入口文件) => (source)

> 说明：在上面的基础上，假如有两个入口文件

index.html

```html
<body>
    <script src="./dist/index1.bundle.js"></script>
    <script src="./dist/index2.bundle.js"></script>
</body>
```

js 文件

```js
// index1.js
document.write('<h1>Hello World</h1>');

// index2.js
document.write('<h1>Hello World!!!</h1>');
```

 webpack.config.js

```js
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
```

运行 npm run build 打包查看结果



## 二、loader

### Demo3: babel-loader => (source)

> 说明：将 es6 的语法转成 es5

index.html

```html
<body>
    <script src="./dist/bundle.js"></script>
</body>
```

base.js 文件导出模块，index.js 文件引入模块

```js
// base.js
let str = 'hello world';

export { str }

// index.js
import { str } from './base'

document.write(`<h1>${str}</h1>`);
```

浏览器不识别 es6 的语法，需要将 es6 转成 es5。下面安装一些依赖

```bash
npm i @babel/core @babel/preset-env babel-loader -D
```

 webpack.config.js

```js
const path = require('path');

module.exports = {
    mode: "development",
    entry: './js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}
```

运行 npm run build 打包查看结果



### Demo4: css-loader => (source)

> 说明：以 import 方式导入 css

index.html

```html
<body>
    <script src="./dist/bundle.js"></script>
</body>
```

index.css

```css
body {
    background-color: antiquewhite;
}
```

index.js

```js
import '../css/index.css'
```

下面安装一些依赖

```bash
# es6 转 es5
npm i @babel/core @babel/preset-env babel-loader -D

# 导入 css
npm i css-loader style-loader -D
```

 webpack.config.js

```js
const path = require('path');

module.exports = {
    mode: "development",
    entry: './js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}
```

运行 npm run build 打包查看结果



## 三、plugins

### Demo5: html-webpack-plugin => (source)

> 说明：打包 html 文件

index.html

```html
<body>
    <script src="./dist/bundle.js"></script>
</body>
```

index.js

```js
document.write('<h1>Hello World</h1>');
```

安装依赖

```bash
npm i html-webpack-plugin -D
```

 webpack.config.js

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [new HtmlWebpackPlugin({template:'./index.html'})]
}
```

运行 npm run build 打包去 dist 目录查看结果



## 四、热加载

### Demo6: webpack-dev-server => (source)

> 说明：之前编程每次写完都要再编译一次，用 `webpack` 提供的 `webpack --watch` 命令动态监听文件变化能实时打包，但不仅需要手动刷新浏览器，而且随着文件增多打包速度也会变慢。使用热加载即能实时监听文件变化，而且会自动去刷新浏览器

> 原理：热加载的原理是 webpack 内部会起一个服务器，把打包后的数据都放进去，然后提供一个地址让你访问。

index.html

```html
<body>
    <script src="./dist/bundle.js"></script>
</body>
```

index.js

```js
document.write('<h1>Hello World!!</h1>');
```

安装依赖

```bash
npm i html-webpack-plugin webpack-dev-server -D
```

package.json

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "cross-env NODE_ENV=production webpack --config webpack.config.js",
    "dev": "cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js"
  },
```

 webpack.config.js

```js
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
        }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    )
}

module.exports = config
```





## 参考

https://github.com/ruanyf/webpack-demos