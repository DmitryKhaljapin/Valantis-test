const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },

    devServer: {
        port: 3000
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: '../public/index.html'
        }),
        new CleanWebpackPlugin(),
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env', "@babel/preset-react"]
                  }
                }  
            }      
        ]
    }
}