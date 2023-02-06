export default [
  {
    path: "/knowledge",
    name: "knowledge",
    component: () => import("@/components/Knowledge/Knowledge"),
  },
  {
    path: "/knowledge/:library/:type",
    component: () => import("@/components/Release/Knowledge"),
  }
]