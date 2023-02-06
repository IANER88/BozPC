export default [
  {
    path: "home",
    component: () => import("@/components/Admin/user/home"),
  },
  {
    path: "audit",
    component: () => import("@/components/Admin/user/main"),
  }
]