import VueRouter from "vue-router";
import Admin from "./admin"
import Course from "./course"
import Space from "./space"
import Home from "./home"
import Knowledge from "./knowledge";
export default new VueRouter({
  mode: "history",
  routes: [
    ...Home,
    ...Course,
    ...Space,
    ...Admin,
    ...Knowledge,
    {
      path: "/notAuth",
      component: () => import("../components/Auth")
    },
    {
      path: "/login",
      component: () => import("../components/Login")
    },
    {
      path: "/release/:type",
      name: "release",
      meta: {
        isAuth: true,
      },
      component: () => import("../components/Release/Editor")
    },
    {
      path: "/audit/:alias/:id",
      meta: {
        isAuth: true,
      },
      component: () => import("../components/Release/Audit")
    },
    {
      path: "/search",
      component: () => import("../components/Home/Search")
    },
    {
      path: "*",
      component: () => import("@/components/NotFound")
    },
    {
      path: "404",
      component: () => import("@/components/NotFound")
    }
  ]
})