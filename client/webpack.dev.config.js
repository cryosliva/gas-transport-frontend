// const webpack = require('webpack');
const path = require('path');

const parentDir = path.join(__dirname, '../');

module.exports = {
    entry: [
        path.join(__dirname, './index.js'),
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }, {
            test: /\.less$/,
            loaders: ['style-loader', 'css-loader', 'less-loader'],
        }, {
            test: /\.css$/,
            use: [
                {loader: 'style-loader'},
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[name]__[local]-[hash:base64:5]',
                    },
                },
            ],
        }, {
            test: /\.svg$/,
            loader: 'svg-inline-loader',
        }, {
            test: /\.(gif|png|jpe?g)$/i,
            use: [
                'file-loader',
                {
                    loader: 'image-webpack-loader',
                    options: {
                        bypassOnDebug: true,
                        disable: true,
                    },
                },
            ],
        }],
    },
    output: {
        path: `${parentDir}/dist`,
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: parentDir,
        historyApiFallback: true,
        proxy: {
            '/api/**': {
                target: 'http://localhost:5000',
                secure: false,
                changeOrigin: true,
            },
        },
    },
};
