const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: "eval-source-map",
    entry: {
        index: path.join(__dirname, 'web', 'index.js'),
    },
    output: {
        clean: true,
        filename: '[name].js',
        path: path.resolve(__dirname, 'public'),
        publicPath: "",
    },
    resolve: {
        modules: [ 'node_modules' ],
        alias: {
            "@src": path.resolve(__dirname, 'web')
        },
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            },
        },
        {
            test: /\.(c|sa|sc)ss$/i,
            use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader'],
        },
        {
            test: /\.(png|svg|jpe?g|gif)$/,
            loader: 'file-loader'
        },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "title",
        }),
        new MiniCssExtractPlugin({ filename: 'style.css' })
    ],
};
