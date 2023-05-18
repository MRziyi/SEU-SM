// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path: '/user/login',
          layout: false,
          name: 'login',
          component: './user/Login',
        },
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          name: 'register-result',
          icon: 'smile',
          path: '/user/register-result',
          component: './user/register-result',
        },
        {
          name: 'register',
          icon: 'smile',
          path: '/user/register',
          component: './user/register',
        },
        {
          component: '404',
        },
      ],
    },

    {
      path: '/profile',
      name: '详情',
      icon: 'profile',
      hideInMenu: true,
      routes: [
        {
          path: '/profile',
          redirect: '/profile/basic',
        },
        {
          name: '基础',
          icon: 'smile',
          path: '/profile/basic',
          component: './profile/basic',
        },
        {
          name: '进阶',
          icon: 'smile',
          path: '/profile/advanced',
          component: './profile/advanced',
        },
        {
          path: '/profile/item-info/:itemId',
          component: './profile/ItemInfo',
          name: '商品详情',
          icon: 'book',
        },
        {
          path: '/profile/order-info/:orderId',
          name: '历史订单',
          icon: 'book',
          component: './profile/orderInfo',
        },
      ],
    },
    {
      name: '市场',
      icon: 'shoppingCart',
      path: '/market',
      component: './market',
    },
    {
      path: '/dashboard',
      name: '仪表盘',
      icon: 'dashboard',
      access: 'canAdmin',
      routes: [
        {
          path: '/dashboard',
          redirect: '/dashboard/analysis',
        },
        {
          name: 'analysis',
          icon: 'smile',
          path: '/dashboard/analysis',
          component: './dashboard/analysis',
        },
        {
          name: 'monitor',
          icon: 'smile',
          path: '/dashboard/monitor',
          component: './dashboard/monitor',
        },
        {
          name: 'workplace',
          icon: 'smile',
          path: '/dashboard/workplace',
          component: './dashboard/workplace',
        },
      ],
    },
    {
      path: '/form',
      icon: 'form',
      name: '表单',
      routes: [
        {
          path: '/form',
          redirect: '/form/basic-form',
        },
        {
          name: '基础表单',
          icon: 'smile',
          path: '/form/basic-form',
          component: './form/basic-form',
        },
        {
          name: '分步表单',
          icon: 'smile',
          path: '/form/step-form',
          component: './form/step-form',
        },
        {
          name: '进阶表单',
          icon: 'smile',
          path: '/form/advanced-form',
          component: './form/advanced-form',
        },
        {
          name: '总体表单预览',
          icon: 'smile',
          path: '/form/total-form',
          component: './form/total-form',
        },
      ],
    },
    {
      path: '/list',
      icon: 'table',
      name: '列表',
      routes: [
        {
          path: '/list/search',
          name: '列表搜索',
          component: './list/search',
          routes: [
            {
              path: '/list/search',
              redirect: '/list/search/articles',
            },
            {
              name: '文章',
              icon: 'smile',
              path: '/list/search/articles',
              component: './list/search/articles',
            },
            {
              name: '应用',
              icon: 'smile',
              path: '/list/search/applications',

              component: './list/search/applications',
            },
          ],
        },
        {
          path: '/list',
          redirect: '/list/table-list',
        },
        {
          name: '表格',
          icon: 'smile',
          path: '/list/table-list',
          component: './list/table-list',
        },
        {
          name: '基本列表',
          icon: 'smile',
          path: '/list/basic-list',
          component: './list/basic-list',
        },
        {
          name: '卡片列表',
          icon: 'smile',
          path: '/list/card-list',
          component: './list/card-list',
        },
      ],
    },
    {
      name: '个人',
      icon: 'user',
      path: '/account',
      routes: [
        {
          path: '/account',
          redirect: '/account/center',
        },
        {
          name: '个人中心',
          icon: 'smile',
          path: '/account/center',
          component: './account/center',
        },
        {
          name: '个人设置',
          icon: 'smile',
          path: '/account/settings',
          component: './account/settings',
        },
      ],
    },
    {
      path: '/',
      redirect: '/market',
    },
    {
      component: '404',
    },
  ],
  access: {},
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    // https://ant.design/docs/react/customize-theme-variable-cn
    'root-entry-name': 'variable',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: {
    '/api/': {
      target: 'http://123.60.24.195',
      changeOrigin: true,
    },
  },
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
