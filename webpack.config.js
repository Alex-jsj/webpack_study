const path = require('path');
const uglify = require('uglifyjs-webpack-plugin'); //js代码压缩插件
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin"); //提取css

var website = {
    publicPath: "http://localhost:1717/"
}

module.exports = {
    //入口文件的配置项
    entry: {
        entry: './src/entry.js',
        entry2: './src/entry2.js'
    },
    //出口文件的配置项
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: website.publicPath
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module: {
        rules: [{
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(png|jpg|gif)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        outputPath: 'images/'
                    }
                }]
            },
            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            }
        ]
    },
    //插件，用于生产模版和各项功能
    plugins: [
        new uglify(),
        new htmlPlugin({
            minify: { //对html文件进行压缩，removeAttrubuteQuotes是去掉属性的双引号。
                removeAttributeQuotes: true
            },
            hash: true, //为了开发中js有缓存效果，加入hash，可以有效避免缓存JS
            template: './src/index.html' //要打包的html模版路径和文件名称

        }),
        new extractTextPlugin("./css/index.css")
    ],
    //配置webpack开发服务功能
    devServer: {
        //设置基本目录结构
        contentBase: path.resolve(__dirname, 'dist'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host: 'localhost',
        //服务端压缩是否开启
        compress: true,
        //配置服务端口号
        port: 1717
    }
}