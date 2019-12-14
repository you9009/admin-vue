const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  productionSourceMap: false,
  runtimeCompiler: true,
  assetsDir: 'assets',
  devServer: {
    host: 'localhost',
    port: 2222,
    open: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        src: path.join(__dirname, 'src'),
        store: path.join(__dirname, 'src/store'),
        views: path.join(__dirname, 'src/views'),
        assets: path.join(__dirname, 'src/assets'),
        components: path.join(__dirname, 'src/components')
      }
    },
    plugins: [
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(js|css)$'),
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false
      })
    ]
  }
}
