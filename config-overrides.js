const path = require('path');

module.exports = function override(config, env) {
  // alias
  config.resolve.alias = {
    ...config.resolve.alias,
    app: path.resolve(__dirname, './src/js'),
    style: path.resolve(__dirname, './src/style'),
    config: path.resolve(__dirname, './src/config'),
    assets: path.resolve(__dirname, './src/assets'),
  };
  return config;
};
