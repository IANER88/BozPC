const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    historyApiFallback: true,
    allowedHosts: "all",
    proxy: {
      // '/api': {
      //   cahngeOrigin: true, // 是否开启跨域
      //   pathRewrite: {
      //     '^/api': ''
      //   }
      // }
    },
  },
})
