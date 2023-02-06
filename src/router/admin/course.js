export default [
  {
    path: "main",
    component: () => import("@/components/Admin/course/main")
  },
  {
    path: "manage",
    component: () => import("@/components/Admin/course/manage")
  },
  {
    path: "add",
    component: () => import("@/components/Admin/course/add")
  },
  {
    path: "alter",
    component: () => import("@/components/Admin/course/alter")
  },
  {
    path: "del",
    component: () => import("@/components/Admin/course/del")
  },
  {
    path: "manage",
    component: () => import("@/components/Admin/course/manage")
  }
]