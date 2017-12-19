const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require("path");

module.exports = {
    entry: ['whatwg-fetch', './index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: [ 
                    { 
                        loader: 'babel-loader',
                        options: {
                            presets: ["es2017", "react"]
                        }
                    }
                ],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    // {
                    //     loader: 'style-loader'
                    // },
                    // {
                    //     loader: 'css-loader',
                    //     options: {
                    //         modules: true
                    //     }
                    // }
                    {
                        loader: 'raw-loader'
                    }
                ]
            },
            {
                test: /\.useable\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'style-loader/useable'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.html/,
                loader: "raw-loader"
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            title: "Book Trading Club",
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 8081,
            files: "dist/**/*.*",
            server: {
                baseDir: ["./", "dist"],
                index: "index.html"
            }
        })
        // new BrowserSyncPlugin({
        //     host: "localhost",
        //     port: 8081,
        //     proxy: "localhost:8080"
        // })
    ]
};