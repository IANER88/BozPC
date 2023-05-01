const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    historyApiFallback: true,
    allowedHosts: "all",
    // proxy: {
    //   '/api': {
    //     target:"https://movie.douban.com",
    //     cahngeOrigin: true, // 是否开启跨域
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // },
  },
})
