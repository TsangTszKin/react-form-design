const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    devtool: 'eval-source-map',
    // entry: __dirname + "/src/index.js",//已多次提及的唯一入口文件
    // output: {
    //     path: __dirname + "/dist",//打包后的文件存放的地方
    //     filename: "js/bundle.js"//打包后输出文件的文件名
    // },
    devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        hot: true
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
            // //@Lynn 这里我开启自己编写的less文件的css modules功能 除了node_modules库中的less，
            // //也就是可以过滤掉antd库中的样式
            // {
            //     test: /\.less$/,
            //     exclude: /node_modules|antd\.less/,
            //     use: [
            //         require.resolve('style-loader'),
            //         {
            //             loader: require.resolve('css-loader'),
            //             options: {
            //                 // importLoaders: 1,
            //                 modules: true,
            //                 localIdentName: "[name]__[local]___[hash:base64:5]"
            //             },
            //         },
            //         {
            //             loader: require.resolve('postcss-loader'),
            //             options: {
            //                 ident: 'postcss',
            //                 plugins: () => [
            //                     require('postcss-flexbugs-fixes'),
            //                     autoprefixer({
            //                         browsers: [
            //                             '>1%',
            //                             'last 4 versions',
            //                             'Firefox ESR',
            //                             'not ie < 9', // React doesn't support IE8 anyway
            //                         ],
            //                         flexbox: 'no-2009',
            //                     }),
            //                 ],
            //             },
            //         },
            //         {
            //             loader: require.resolve('less-loader'), // compiles Less to CSS
            //         },
            //     ],
            // },
            // {
            //     test: /\.less$/,
            //     include: /node_modules|antd\.less/,
            //     use: [
            //         require.resolve('style-loader'),
            //         {
            //             loader: require.resolve('css-loader'),
            //             options: {
            //                 importLoaders: 1,
            //             },
            //         },
            //         {
            //             loader: require.resolve('postcss-loader'),
            //             options: {
            //                 ident: 'postcss',
            //                 plugins: () => [
            //                     require('postcss-flexbugs-fixes'),
            //                     autoprefixer({
            //                         browsers: [
            //                             '>1%',
            //                             'last 4 versions',
            //                             'Firefox ESR',
            //                             'not ie < 9', // React doesn't support IE8 anyway
            //                         ],
            //                         flexbox: 'no-2009',
            //                     }),
            //                 ],
            //             },
            //         },
            //         {
            //             loader: require.resolve('less-loader'), // compiles Less to CSS
            //         },
            //     ],
            // },
            // //@Lynn 这里设置css开启modules支持,node_modules和antd里面的css不开启
            // {
            //     test: /\.css$/,
            //     exclude: /node_modules|antd\.css/,
            //     use: [
            //         require.resolve('style-loader'),
            //         {
            //             loader: require.resolve('css-loader'),
            //             options: {
            //                 importLoaders: 1,
            //                 // 改动
            //                 modules: true,   // 新增对css modules的支持
            //                 localIdentName: '[name]__[local]__[hash:base64:5]', //
            //             },
            //         },
            //         {
            //             loader: require.resolve('postcss-loader'),
            //             options: {
            //                 ident: 'postcss',
            //                 plugins: () => [
            //                     require('postcss-flexbugs-fixes'),
            //                     autoprefixer({
            //                         browsers: [
            //                             '>1%',
            //                             'last 4 versions',
            //                             'Firefox ESR',
            //                             'not ie < 9', // React doesn't support IE8 anyway
            //                         ],
            //                         flexbox: 'no-2009',
            //                     }),
            //                 ],
            //             },
            //         },
            //     ],
            // },
            // //@Lynn 然后针对node_modules和antd里面的css写编译配置
            // {
            //     test: /\.css$/,
            //     include: /node_modules|antd\.css/,
            //     use: [
            //         require.resolve('style-loader'),
            //         {
            //             loader: require.resolve('css-loader'),
            //             options: {
            //                 importLoaders: 1,
            //                 // 改动
            //                 // modules: true,   // 新增对css modules的支持
            //                 // localIdentName: '[name]__[local]__[hash:base64:5]', //
            //             },
            //         },
            //         {
            //             loader: require.resolve('postcss-loader'),
            //             options: {
            //                 ident: 'postcss',
            //                 plugins: () => [
            //                     require('postcss-flexbugs-fixes'),
            //                     autoprefixer({
            //                         browsers: [
            //                             '>1%',
            //                             'last 4 versions',
            //                             'Firefox ESR',
            //                             'not ie < 9', // React doesn't support IE8 anyway
            //                         ],
            //                         flexbox: 'no-2009',
            //                     }),
            //                 ],
            //             },
            //         },
            //     ],
            // },
            {
                test: /(\.less|\.css)$/,
                use: [//从下往上来选择解析
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
        ],
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({//此插件可以配置多入口多页面
            template: __dirname + "/src/index.tmpl.html",//一个这个插件的实例，并传入相关的参数
            inject: true,
            minify: {
                collapseWhitespace: true,
            }
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin(),
        // new ExtractTextPlugin("style.css"),
        new webpack.DefinePlugin({
            'process.env': {
                'http_env': JSON.stringify(process.env.http_env)
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
            chunkFilename: 'css/style.[contenthash:5].css'
        }),
    ],
}