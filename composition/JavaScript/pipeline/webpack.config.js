module.exports = {
    entry: "./src/app.js",
    output: {
        path: __dirname + "/distro",
        filename: "bundle.js"
    },
    watch: true,
    devtool: 'inline-source-map',
    module: {
        preloaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "jshint-load"
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    resolve: {
        extensions: ['', '.js']
    }
}