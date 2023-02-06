import home from "./admin/home"
import article from "./admin/article"
import audit from "./admin/audit"
import course from "./admin/course"
import tag from "./admin/tag"
import user from "./admin/user"
import Def from "@/assets/js/Def"
const component = () => import("@/components/Admin")

export default Def.Recursive({
  list: [
    {
      path: "/admin",
      component: () => import("@/components/Admin/main"),
      redirect: "/admin/home/main",
      children: [
        {
          path: "/admin/home",
          redirect: "/admin/home/main",
          component,
          children: home
        },
        {
          path: "article",
          component,
          redirect: "/admin/article/home",
          children: article,
        },
        {
          path: "audit",
          component,
          children: audit
        },
        {
          path: "course",
          component,
          redirect: "/admin/course/main",
          children: course
        },
        {
          path: "tag",
          component,
          redirect: "/admin/tag/main",
          children: tag
        },
        {
          path: "user",
          component,
          redirect: "/admin/user/main",
          children: user
        },
        {
          path: "course/:name/:operat",
          component: () => import("@/components/Admin/course/AdminEditor")
        },
      ]
    }
  ],
  meta: {
    isAuth: true,
    is_superuser: true,
  },
})