export default [
  {
    path: "home",
    component: () => import("@/components/Admin/article/home"),
  },
  {
    path: "main",
    component: () => import("@/components/Admin/article/main"),
  }
]