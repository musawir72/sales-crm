const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

// NODE_ENV will be 'production' on heroku, 'test' in testing env, and if neither it will be 'development'
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Load test or development env variables
if (process.env.NODE_ENV === "test") {
  console.log("rrrrrrrr", process.env.NODE_ENV);
  require("dotenv").config({ path: ".env.test" });
} else if (process.env.NODE_ENV === "development") {
  require("dotenv").config({ path: ".env.development" });
}

module.exports = (env, argv) => {
  console.log("ENV" + env);
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: ["babel-polyfill", "./src/index.js"],
    output: {
      path: path.join(__dirname, "public", "dist"),
      filename: "bundle.js"
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
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "../index.html",
        inject: false
      }),
      new webpack.DefinePlugin({
        REACT_APP_BASE_URL: JSON.stringify("http://127.0.0.1:5000")
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: "disable",
        generateStatsFile: false
      })
    ],
    devtool: env === "production" ? "source-map" : "inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      // for all 404 pages send back the html file
      inline: true,
      host: "0.0.0.0",
      historyApiFallback: true,
      publicPath: "/dist/",
      port: 3000
    }
  };
};
