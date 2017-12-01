const path = require('path')
const glob = require('glob') //用于文件名匹配
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var entries = function () {
    //获取所有入口
    var jsdir = path.resolve('ewt360/source', './js')
    var entryFiles = glob.sync(jsdir + '/*.js')

    var map = {};

    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = ['webpack-dev-server/client?http://0.0.0.0:8080',
            'webpack/hot/only-dev-server', filePath];
    }
    console.log(map)
    return map;

}

module.exports = {
    entry: entries(),
    output: {
        path: path.join(__dirname, "../ewt360/js"),
        filename: "[name].js"
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
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader"]
            })

        },

        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "sass-loader"]
            })
            // use: ExtractTextPlugin.extract(fallback: "style-loader",use:[ 'css-loader', 'sass-loader']),
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }
        ],
        loaders: [

        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        // new HtmlWebpackPlugin({  // Also generate a test.html 
        //     filename: 'testzzz.html'
        // }),//该插件将为您生成一个HTML5文件，这个文件用script标签引用所有的webpack包
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        })
    ]
}