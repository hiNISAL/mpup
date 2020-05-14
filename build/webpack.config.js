const NodemonPlugin = require('nodemon-webpack-plugin');
module.exports = (env = {}) => {
  const config = {
    entry: ['./src/index.ts'],
    mode: env.development ? 'development' : 'production',
    target: 'node',
    devtool: env.development ? 'cheap-eval-source-map' : false,
    resolve: {
      extensions: ['.ts', '.js'],
      modules: ['node_modules', 'src', 'package.json'],
    },
    module: {
      rules: [{
        test: /\.ts$/,
        use: 'ts-loader',
      }, ],
    },
    plugins: [],
  };

  if (env.nodemon) {
    config.watch = true;
    config.plugins.push(new NodemonPlugin());
  }

  return config;
};
