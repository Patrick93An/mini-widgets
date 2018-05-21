const HtmlWebPackPlugin = require("html-webpack-plugin");

var config = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }, {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }, {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }
        ]
      }, {
        test: /\.(ttf|otf|jpg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              fallback: "file-loader",
              // Below are the fallback options
              name: "[path][hash].[ext]",
              publicPath: "/static",
              outputPath: "../static"
            }
          }
        ]
      }
    ]
  },

  devServer: {
    historyApiFallback: true,
  },

  output: {
    publicPath: '/app'
  },
    
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "../index.html"
    }),
  ]
}

module.exports = config;