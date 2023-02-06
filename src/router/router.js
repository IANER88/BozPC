import Router from "./main";
import { state } from "@/assets/js/Store"
// 路由拦截单独文件
Router.beforeEach((to, from, next) => {
  setTimeout(async () => {
    const { state: { info: { name, is_superuser } } } = await state
    if (to.meta.isAuth) {
      if (name) {
        next()
      } else {
        next("/login")
        return
      }
      if (to.meta.is_superuser) {
        is_superuser === 1 ? next() : next("/notAuth");
      } else {
        next()
      }
    } else {
      next()
    }
  }, 100)
})

export default Router