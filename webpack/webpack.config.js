const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob = require("glob");
const purifyCSSPlugin = require("purifycss-webpack");
module.exports = {
  entry:{
    index:"./src/index.js"
  },
  output:{
    path:path.resolve(__dirname,"dist"),
    filename:'[name].js'
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{
              loader:"css-loader",
              options:{importLoaders:1}
            },'postcss-loader'],
            publicPath:"../"
          })
      },{
        test:/\.(jpg|png|gif)$/,
        use:[{
          loader:'url-loader',
          options:{
            limit:300,
            outputPath:"image/"
          }
        }]
      },{
        test:/\.html$/,
        loader:'html-withimg-loader'
      },{
        test:/\.scss/,
        use:ExtractTextPlugin.extract({
          use:[
            {loader:'css-loader'},
            {loader:'sass-loader'}
          ],
          fallback:"style-loader"
        })
        
      },{
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:["@babel/preset-env"]
          }
        },
        exclude:/node_modules/
      }
    ]
  },
  plugins:[
    new ExtractTextPlugin("css/main.css"),
    new purifyCSSPlugin({
      paths:glob.sync(path.join(__dirname,'src/*.html'))
    }),
    new HtmlWebpackPlugin({  
      minify:{
        removeAttributeQuotes:true
      },
      hash:true,
      filename: 'index.html',
      template: 'src/index.html'
    })
  ],
  devServer:{
    contentBase:path.resolve(__dirname,"dist"),
    host:"localhost",
    compress:true,
    port:"8081"
  }
}