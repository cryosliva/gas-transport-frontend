const path = require('path');

const root = path.resolve(__dirname, '..');

const cacheDir = path.resolve(__dirname, '..', 'node_modules', '.cache');

const getThreadLoader = name => ({
    loader: 'thread-loader',
    options: {
        workerParallelJobs: 50,
        poolRespawn: false,
        name
    }
});

module.exports = {
    mode: 'production',
    entry: path.resolve(root, 'client', 'index.js'),
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
              use: ['thread-loader', 'babel-loader']
          },
          {
            test:  /\.css$/,
              use: [
                  'thread-loader',
                  {
                      loader: 'style-loader'
                  },
                  {
                      loader: 'css-loader',
                      options: {
                          modules: true
                      },
                  },
              ]
          },
          {
              test: /\.(gif|png|jpe?g)$/i,
              use: [
                  'file-loader',
                  {
                      loader: 'image-webpack-loader',
                      options: {
                          bypassOnDebug: true,
                          disable: true,
                      },
                  }
              ],
          },
      ],
  },
    output: {
        path: `${root}/dist`,
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: root,
        historyApiFallback: true,
        proxy: {
            '/api/**': {
                target: 'http://localhost:5000',
                secure: false,
                changeOrigin: true,
            },
        },
    },
};
