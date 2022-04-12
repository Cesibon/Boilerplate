const CracoAlias = require("craco-alias");

const TerserPlugin = require("terser-webpack-plugin");


// craco.config.js
module.exports = {

  plugins: [{
    plugin: CracoAlias,
    options: {
      source: "tsconfig",
      baseUrl: "./src",
      tsConfigPath: "./paths.tsconfig.json"
    }

  }],
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.optimization.minimizer = [new TerserPlugin({terserOptions:{ keep_fnames: true }})]
     // then return an updated webpack config.
     return webpackConfig; 
    }
  },
}

