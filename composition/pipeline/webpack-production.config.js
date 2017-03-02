var WebpackStrip = require("strip-loader");
var devConfg = require("./webpack.config.js");
var stripLoader = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: WebpackStrip.loader("console.log")
};

devConfg.module.loaders.push(stripLoader);

module.exports = devConfg;