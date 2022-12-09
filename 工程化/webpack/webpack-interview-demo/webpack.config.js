const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
        other: './src/add.js'
    },
    output: {
        filename: '[name].bundle.js',
    },
    // devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin()
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    minSize: 0
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    }

}

//总共有5个chunks

// entry index
// entry other
// runtime
// split chunks common
// split chunks vendor