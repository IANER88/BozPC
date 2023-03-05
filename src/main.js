import Vue from "vue"
import App from "./App.vue"
import VueRouter from "vue-router"
import router from "./router/router"
import Ele from "element-ui"
import Fetch from "./assets/js/Fetch"
import store from "./assets/js/Store"
import Def from "./assets/js/Def"
import Icon from './assets/js/Icon'
import xss from "xss"
import NProgress from "nprogress"
import 'nprogress/nprogress.css'
Vue.config.productionTip = false
Vue.prototype.Fetch = Fetch
Vue.prototype.Icon = Icon
Vue.prototype.Def = Def
Vue.prototype.xss = xss
import axios from "axios"
NProgress.configure({ showSpinner: false });
axios.interceptors.request.use(config => {
  NProgress.start()
  return config
})
//在response拦截器中，隐藏进度条
axios.interceptors.response.use(config => {
  //当进入response拦截器，表示请求已经结束，我们就结束进度条
  NProgress.done()
  return config
})

Vue.use(VueRouter).use(Ele)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


