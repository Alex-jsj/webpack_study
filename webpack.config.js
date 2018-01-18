const path = require('path');
module.exports = {
    //入口文件的配置项
    entry: {
        entry: './src/entry.js',
        entry2: './src/entry2.js'
    },
    //出口文件的配置项
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module: {},
    //插件，用于生产模版和各项功能
    plugins: [],
    //配置webpack开发服务功能
    devServer: {}
}