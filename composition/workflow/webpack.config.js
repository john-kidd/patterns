module.exports = {
    entry: "./app.js",
    output: {
        filename: "bundle.js"
    },
    watch: true,
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