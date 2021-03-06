// https://umijs.org/config/
import { defineConfig, utils } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import webpackPlugin from './plugin.config';
const { winPath } = utils; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
// const GA_KEY = true;

const {  REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  analytics:
  {
    ga: 'UA-110966322-2',
  },
  // analytics: GA_KEY
  //   ? {
  //       ga: 'UA-110966322-2',
  //     }
  //   : false,
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'en-US',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: false,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: '/',
          redirect: '/bangladesh',
        },
        {
          path: 'bangladesh',
          name: 'Bangladesh',
          // title: 'Bangladesh Data',
          icon: 'area-chart',
          component: 'Bangladesh',
        },
        {
          path: 'global',
          name: 'Global',
          // title: 'Global Data',
          icon: 'global',
          component: 'GlobalDashboard',
        },
        // {
        //   path: 'data',
        //   name: 'Data',
        //   title: 'Data',
        //   icon: 'cloud',
        //   component: 'Data',
        // },
        {
          path: 'countries',
          name: 'Countries',
          icon: 'block',
          component: 'CountrySelector',
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    // ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
    //   ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
  },
  cssLoader: {
    modules: {
      getLocalIdent: (context, _, localName) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }

        const match = context.resourcePath.match(/src(.*)/);

        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '');
          const arr = winPath(antdProPath)
            .split('/')
            .map(a => a.replace(/([A-Z])/g, '-$1'))
            .map(a => a.toLowerCase());
          return `penguin-research-wing${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }

        return localName;
      },
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
});
