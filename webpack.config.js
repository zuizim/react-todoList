var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var Root_path = path.resolve(__dirname);
var App_path = path.resolve(Root_path,'app');
var Build_path = path.resolve(Root_path,'build');

var config = {
    entry: {
        app: path.resolve(App_path,'index.jsx')
    },
    output: {        
        path: Build_path,
        filename: 'bundle.js'
    },
    devtool: "source-map",
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true
    },
    resolve: {
        extensions: [".ts",".tsx",".js",".json",".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                exclude: /node_modules/,
                include: App_path
            },
            {
                enforce: "pre", 
                test: /\.js$/,
                loader: "source-map-loader",
                exclude: /node_modules/,
                include: App_path
            },
            {
                test: /\.jsx?$/,
                loader: "babel-loader",                
                query: {
                    presets: ['es2015','react']
                },
                exclude: /node_modules/,
                include: App_path
            },
            {
                test:/\.less$/,
                loaders: ["style-loader","css-loader","less-loader"]
            },
            {
                test:/\.css$/,
                loaders:['style-loader','css-loader']
            },
            {
                test:/\.(woff|svg|eot|ttf)\??.*$/,
                loader:"url-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:"./index.html",
            title:"Todo List by React",            
            inject: "body",
            minify:{
                removeComments: true
            }            
        })
    ],
    externals: {
        "react":"React",
        "react-dom": "ReactDOM"
    }
};

module.exports = config;