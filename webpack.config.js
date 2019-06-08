const path = require("path");

module.exports = {
    devtool: "cheap-module-inline-source-map",
    entry: ["@babel/core", "./src/app.js"],
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "app_bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            }
        ]
    },
    node: {
        fs: "empty"
    }
};
