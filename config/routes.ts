export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/market',
    name: '市场',
    icon: 'shoppingCart',
    component: './Market',
  },
  {
    path: '/center',
    name: '个人中心',
    icon: 'user',
    component: './Center',
  },
  {
    path: '/orders',
    name: '订单',
    icon: 'creditCard',
    component: './Orders',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/market',
  },
  {
    component: './404',
  },
];
