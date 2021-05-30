module.exports = {
  productionSourceMap: false,
  publicPath: '',
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: '自助點餐系統',
      author: 'ツキノリュウ'
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/scss/_mixin.scss";`
      }
    }
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');
    config.module.rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({ bypassOnDebug: true });
  },
}