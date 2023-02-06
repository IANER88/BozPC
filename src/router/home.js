import Def from "@/assets/js/Def"
export default [
  {
    path: "/",
    component: () => import("../components/Home/Home"),
  },
  ...Def.Recursive({
    list: [{
      path: '/message',
      redirect: "/message/reply",
      component: () => import("../components/Message/Message"),
      children: [
        {
          path: "reply",
          component: () => import("../components/Message/Reply")
        },
        {
          path: "like",
          component: () => import("../components/Message/Like")
        },
        {
          path: "ait",
          component: () => import("../components/Message/Ait")
        },
        {
          path: "system",
          component: () => import("../components/Message/System")
        },
        {
          path: "mymessage",
          component: () => import("../components/Message/MyMessage")
        },
      ]
    }],
    meta: {
      isAuth: true,
    }
  }),
  {
    path: "/article/:name/:id",
    component: () => import("../components/Home/Article")
  },
  {
    path: "/nav/:type",
    component: () => import("../components/Home/Nav/Main"),
    children: [
      {
        path: ":/tag",
        component: () => import("../components/Home/Nav/Content")
      }
    ]
  }
]