import path from "path";
import { fileURLToPath } from "url";
import webpack from "webpack";
import HTMLWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface EnvVariables {
  mode?: "development" | "production";
  port?: number;
}

export default (env: EnvVariables = {}) => {
  const mode = env.mode || "development";
  const port = env.port || 3000;
  const isDev = mode === "development";

  const config: webpack.Configuration = {
    mode: mode,
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].[contenthash].js",
      clean: true,
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }),
      new webpack.ProgressPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    devtool: isDev ? "inline-source-map" : false,
    devServer: isDev
      ? {
          port: port,
          open: true,
          hot: true,
          historyApiFallback: true,
        }
      : undefined,
  };

  return config;
};
