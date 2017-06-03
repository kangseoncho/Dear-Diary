const path = require('path');
const webpack = require('webpack');

module.exports = {
    //do webpack stuff here
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve('public/diary'), //determines where the file is going (?)
        // publicPath: 'http://localhost:3000/public/diary',
        filename: 'bundle.js',
    },
    devtool: 'source-map',
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
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
}