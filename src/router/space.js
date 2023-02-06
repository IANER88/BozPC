export default [
  {
    path: '/space/:name',
    component: () => import("../components/Space/Space"),
    redirect: "/space/:name/article",
    children: [
      {
        path: 'article',
        component: () => import("../components/Space/Article"),
      },
      {
        path: 'history',
        component: () => import("../components/Space/History"),
        meta: {
          isAuth: true
        }
      },
      {
        path: 'knowledge',
        component: () => import("../components/Space/Knowledge"),
      },
      {
        path: 'collect',
        component: () => import("../components/Space/Collect"),
      }
      ,
      {
        path: 'dynamic',
        component: () => import("../components/Space/Dynamic"),
      },
      {
        path: 'follower',
        component: () => import("../components/Space/Follower"),
      },
      {
        path: 'fan',
        component: () => import("../components/Space/Fan"),
      }
    ]
  }
]