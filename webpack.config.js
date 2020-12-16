const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

  mode: 'development',
  // Minimizar css en producción
  optimization: {
    minimizer: [ new OptimizeCssAssetsPlugin() ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      // Exportar css a dist
      {
        test: /\.css$/i,
        // Excluir styles
        exclude: /styles\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // Exportar estilos globales a dist
      {
        test: /styles\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      // Exportar html a dist
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: false,
          minimize: false
        }
      },
      // Manejo de imágenes
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      // .[contenthash]
      filename: '[name].css',
      ignoreOrder: false
    }),
    new CopyPlugin({
      patterns:[
        { from: 'src/assets', to: 'assets/'}
      ]
    }),
    new CleanWebpackPlugin()
  ]

}


