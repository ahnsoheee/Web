const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
require('dotenv').config()

module.exports = {
    mode: "development",
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: 'babel-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.(scss|css)$/,
            use: ["style-loader", "css-loader"],
        }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        inline: true,
        hot: true,
        host: process.env.HOST,
        port: process.env.PORT
    },

    plugins: [new HtmlWebpackPlugin(
        {
            template: 'src/app.html'
        }
    )]
}