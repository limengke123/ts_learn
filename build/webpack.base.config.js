const {join} = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:{
        app:join(__dirname,'../src/index.js')
    },
    output:{
        filename:'js/[name].js',
        path:join(__dirname,'../dist'),
        publicPath: "/public/",
        chunkFilename: "chunk/[name].[chunkhash:8].js"
    },
    resolve:{
        extensions:['.ts','tsx','.jsx','.js','.json']
    },
    module: {
        rules: [
            {
                test:/\.tsx?$/,
                loader:"awesome-typescript-loader"
            },
            {
                enforce:"pre",
                test:/\.js$/,
                loader:"source-map-loader"
            },
            {
                test:/\.(js)|(jsx)$/,
                loader:'babel-loader',
                include:join(__dirname,'../src')
            },
            {
                test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader:'url-loader',
                options: {
                    limit:10000,
                    name:'./dist/media/[name].[hash].[ext]'
                }
            },
            {
                test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader:'url-loader',
                options:{
                    limit:10000,
                    name:join(__dirname,'../dist','fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:join(__dirname,'../template.html'),
            filename:'index.html',
            inject:'true',
            favicon:join(__dirname,'../src/assets/fav.ico'),
            minify:{
                removeCommnets:true,
                collapseWhitespace:true,
                removeAttributeQuotes:true
            }
        })
    ],
    externals: {
    }
}