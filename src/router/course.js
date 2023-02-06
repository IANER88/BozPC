export default [
  {
    path: "/course",
    component: () => import("/src/components/Course/Course"),
    children: [
      {
        path: "type",
        component: () => import("/src/components/Course/Type"),
      },
      {
        path: "tool",
        component: () => import("/src/components/Course/Tool"),
      }
    ]
  },
  {
    name: "content",
    path: "/course/:name/:title",
    component: () => import("/src/components/Course/Content"),
  },
]