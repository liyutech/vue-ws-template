const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// const nodeEnv = process.env.NODE_ENV || 'development';
// const nodeEnv = process.env.NODE_ENV || 'production';

// const {ifDevelopment, ifProduction} = getIfUtils(nodeEnv);

const resolvePath = dir => path.join(__dirname, dir);

module.exports = {
    entry: './src/main.js',
    output: {
        filename: '[name]-bundle-[hash].js',
        path: resolvePath('dist'),
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolvePath('src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                loaders: ['vue-style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolvePath('src'), resolvePath('node_modules/fontawesome')]
            }
        ],
    },
    plugins: [

        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            template: 'index.html'
            // template: './src/index.ejs',
        }),
        new CopyWebpackPlugin([{from: 'src/assets', to: 'assets'}]),
        new ExtractTextPlugin('[name]-bundle-[hash].css')
    ]
};