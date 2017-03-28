const path = require('path');

module.exports = {
    //do webpack stuff here
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
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