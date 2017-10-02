const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require("path");

module.exports = {
    entry: './index.js',
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
                    {
                        loader: 'style-loader'
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
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            title: "Book Trading Club",
        }),
        // new BrowserSyncPlugin({
        //     host: 'localhost',
        //     port: 8080,
        //     files: "dist/**/*.*",
        //     server: {
        //         baseDir: ["./", "dist"],
        //         index: "index.html"
        //     }
        // })
        new BrowserSyncPlugin({
            host: "localhost",
            port: 8080,
            proxy: "localhost:8081"
        })
    ]
}