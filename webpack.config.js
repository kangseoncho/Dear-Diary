const path = require('path');
const webpack = require('webpack');

module.exports = {
    //do webpack stuff here
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve('public/blog'), //determines where the file is going (?)
        publicPath: 'http://localhost:3000/public/blog',
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
        ]
    }
}