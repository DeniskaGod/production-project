import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export interface BuildOptions {
  port: number;
}

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port,
    open: true,
    hot: true,
    historyApiFallback: true,
    compress: true,
  };
}
