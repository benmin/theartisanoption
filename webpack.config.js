var HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        __dirname + '/src/public/jsx/ClientApp.jsx',
        __dirname + '/src/public/jsx/Posts.jsx'
    ],
    module: {
        loaders: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
//            include: './src/public/jsx',
            loader: 'babel-loader',
            query: {
                cacheDirectory: false,
                presets: ['es2015','react']
            }
//        },{
//            test: /\.css$/,
//            loader: 'css-loader'
        },{
            test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.ttf$|\.css$/,
            loader: 'file'
        }]
    },
    output: {
        path: __dirname + '/build/public',
        filename: 'app.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: __dirname + '/src/public/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
};