const path = require('path')
const glob = require('glob') //用于文件名匹配
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //css样式从js文件中分离

var entries = function () {
    //获取所有入口
    var jsdir = path.resolve('ewt360/source', './js')
    var entryFiles = glob.sync(jsdir + '/*.js')
    console.log(entryFiles)
    var map = {};

    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filePath;
    }
    return map;
}

module.exports = {
    entry: entries(),
    output: {
        path: path.join(__dirname, "../ewt360/js"),
        filename: "[name]-[chunkhash].js"
    },
    module: {
        rules: [{
            test: require.resolve('jquery'),
            use: [{
                loader: 'expose-loader',
                options: '$'
            }]
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        }],
        loaders: [

        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        })
    ]
}