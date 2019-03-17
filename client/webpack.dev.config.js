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
    mode: 'development',
    entry: path.resolve(root, 'client', 'index.js'),
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
              use: [
                  {
                      loader: 'cache-loader',
                      options: {
                          cacheDirectory: path.resolve(cacheDir, 'js')
                      }
                  },
                  getThreadLoader('js'),
                  {
                      loader: 'babel-loader',
                      options: {
                          cacheDirectory: path.resolve(cacheDir, 'babel')
                      }
                  }
              ]
          },
          {
            test:  /\.css$/,
              use: [
                  {
                      loader: 'cache-loader',
                      options: {
                          cacheDirectory: path.resolve(cacheDir, 'css'),
                      }
                  },
                  getThreadLoader('css'),
                  {
                      loader: 'style-loader'
                  },
                  {
                      loader: 'css-loader',
                      options: {
                          modules: true,
                          localIdentName: '[name]__[local]-[hash:base64:5]',
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
            '**': {
                target: 'http://localhost:5000',
                secure: false,
                changeOrigin: true,
            },
        },
    },
};
