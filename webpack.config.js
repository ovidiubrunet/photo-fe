// webpack v4
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production'


module.exports = {

  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  entry: { main: './src/app.js'},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },


      {
        test: /\.woff(2)?(\?[a-z0-9]+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      }, 
      
      
      {
        test: /\.(ttf|eot|gif|svg)(\?[a-z0-9]+)?$/,
        loader: "file-loader"
      },


      {
        test: /\.(sa|sc|c)ss$/,
        use: [
         // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
         // {'loader': MiniCssExtractPlugin.loader},
         {
           'loader': MiniCssExtractPlugin.loader
         } ,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ]
  },
  plugins: [
    
    new CleanWebpackPlugin(['dist'], {}),
    new MiniCssExtractPlugin({
      filename: "style.min.css"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      {from:'src/images',to:'images'},
      {from:'src/js',to:'js'},
      {from:'src/css',to:'css'},
      {from:'src/fonts',to:'fonts'}
  ]),
  ]
};