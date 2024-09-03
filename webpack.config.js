const path = require('path');

module.exports = (env, argv) => {
  console.log(argv);
  const isProduction = argv.mode === 'production';
  return {
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    devServer: {
      static: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
    },
    mode: isProduction ? 'production' : 'development',
    optimization: {
      minimize: isProduction,
    },
  };
};