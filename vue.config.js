const path = require('path')

module.exports = {
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? '/blog' : '/',
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
        'src': path.join(__dirname, 'src'),
        'store': path.join(__dirname, 'src/store'),
        'views': path.join(__dirname, 'src/views'),
        'assets': path.join(__dirname, 'src/assets'),
        'components': path.join(__dirname, 'src/components')
      }
    }
  }
}
