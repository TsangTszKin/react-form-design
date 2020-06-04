const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    devtool: "null",
    entry: __dirname + "/src/index.js", //已多次提及的唯一入口文件
    output: {
        path: __dirname + "/dist", //打包后的文件存放的地方
        filename: "js/bundle.js" //打包后输出文件的文件名
    },
    resolve: {
        alias: {
            '@': path.resolve("src")
        },
        extensions: ['*', '.js', '.jsx', '.json', '.less', '.css']
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    outputPath: "images"
                }
            },
            {
                test: /(\.less|\.css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            minimize: {
                                autoprefixer: {
                                    add: true,
                                    remove: true,
                                    browsers: ['last 2 versions'],
                                },
                                discardComments: {
                                    removeAll: true,
                                },
                                discardUnused: false,
                                mergeIdents: false,
                                reduceIdents: false,
                                safe: true
                            }
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist', 'build'], { root: __dirname, verbose: true, dry: false }),
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({//此插件可以配置多入口多页面
            template: __dirname + "/src/index.tmpl.html",//一个这个插件的实例，并传入相关的参数
            inject: true,
            minify: {
                collapseWhitespace: true,
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin(), //热加载插件
        // new ExtractTextPlugin("css/style.css"),
        new webpack.DefinePlugin({
            'process.env': {
                'http_env': JSON.stringify(process.env.http_env)
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
            chunkFilename: 'css/style.[contenthash:5].css'
        }),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, 'src/static'),
            to: path.join(__dirname, 'dist', 'static')
        }])
    ]
}