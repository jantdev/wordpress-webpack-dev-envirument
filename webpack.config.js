const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
var path = require("path");

// change these variables to fit your project
const jsPath = "./js";
const cssPath = "./css";
const devpath = path.resolve(__dirname, "../dist");
const phppath = path.resolve(__dirname, "../");
const localDomain = "http://newjantdev.test";

module.exports = {
  entry: {
    app: ["./src/js/app.js", "./src/sass/app.scss"],
  },
  output: {
    path: devpath,
    filename: "js/[name].js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),

    new BrowserSyncPlugin({
      proxy: localDomain,
      files: [phppath + "/*.php"],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s?[c]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.sass$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: { indentedSyntax: true },
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|woff|woff2|eot|ttf|svg)$/i,
        use: "url-loader?limit=1024",
      },
    ],
  },
};
