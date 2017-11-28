const path = require('path')
const glob = require('glob') //用于文件名匹配

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
        filename: "[name].js"
    }
}