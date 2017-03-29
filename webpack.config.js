const path = require('path');
const webpack = require('webpack');

module.exports = {
    //do webpack stuff here
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve('public'),
        publicPath: 'http://localhost:3000/public/',
        filename: 'bundle.js',
    },
    //can put plug in here if we want
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ["es2015", "react"]
                }
            }
            // {
            //     test: /(\.css|\.scss)$/,
            //     loaders: ["style", "css", "sass"]
            // }
        ]
    }
}