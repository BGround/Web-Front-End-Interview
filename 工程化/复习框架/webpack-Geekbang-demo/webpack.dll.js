const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'none',
    entry: {
        library: [
            'react',
            'react-dom'
        ]
    },
    output: {
        path: path.join(__dirname, 'build/library'),
        filename: '[name]_[chunkhash:8].dll.js',
        library: "[name]",
        // clean: true
    },
    plugins: [
        new webpack.DllPlugin({
            name: "[name]_[hash:8]",
            path: path.join(__dirname, 'build/library/library.json')
        })
    ]
}

