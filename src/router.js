import Vue from 'vue'
import Router from 'vue-router'
// route level code-splitting
// this generates a separate chunk (login.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const Main = () => import('./views/Main.vue')

// 登陆模块
const Login = () => import('./views/login')
const LoginSub = () => import('./views/login/sublogin')

// 首页五大类
const Find = () => import('./views/find')
const Account = () => import('./views/account')
const Video = () => import('./views/video')
const Mine = () => import('./views/mine')
const Firends = () => import('./views/firends')
const Recommend = () => import('./views/find/recommend')
const Station = () => import('./views/find/station')
const Daily = () => import('./views/find/daily')
const Sheet = () => import('./views/find/sheet')
const SheetDetail = () => import('./views/find/sheet/sheet-detail')
const Play = () => import('./views/find/play')

Vue.use(Router)

/**
 * 路由配置
 * meta对象下的属性意思
 * @param { String }   transition         过渡的动画  fade-left
 * @param { Array }    activeRouter       当前页面是属于四个菜单或者某个路由的关联操作，如果设置了/main/find 则打开该路由的话，底部菜单第一个按钮显示active状态
 * @param { Boolean }  isFull             是否全屏显示不显示底部菜单
 * @param { Boolean }  keepAlive          页面是否缓存
 */
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      name: 'home',
      redirect: '/main/find',
      component: Main,
      children: [
        {
          path: '/main/find',
          name: 'find',
          redirect: '/main/find/recommend',
          component: Find,
          meta: {
            keepAlive: true
          },
          children: [
            {
              path: '/main/find/recommend',
              name: 'findrecommend',
              component: Recommend,
              meta: {
                keepAlive: true
              }
            },
            {
              path: '/main/find/station',
              name: 'findstaion',
              component: Station
            }
          ]
        },
        {
          path: '/main/account',
          name: 'account',
          component: Account
        },
        {
          path: '/main/video',
          name: 'video',
          component: Video
        },
        {
          path: '/main/mine',
          name: 'mine',
          component: Mine
        },
        {
          path: '/main/firends',
          name: 'firends',
          component: Firends
        },

        // 每日推荐
        {
          path: '/main/daily',
          name: 'daily',
          component: Daily,
          meta: {
            transition: 'fade-left',
            activeRouter: ['/main/find']
          }
        },

        // 歌单集合
        {
          path: '/main/sheet',
          name: 'sheet',
          component: Sheet,
          meta: {
            transition: 'fade-left',
            activeRouter: ['/main/find']
          }
        },
        // 歌单详情
        {
          path: '/main/sheetdetail',
          name: 'sheetdetail',
          component: SheetDetail,
          meta: {
            transition: 'fade-left',
            activeRouter: ['/main/find']
          }
        },

        // 播放页面
        {
          path: '/main/play',
          name: 'play',
          component: Play,
          meta: {
            transition: 'fade-left',
            isFull: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      children: [
        {
          path: '/login/:type',
          name: 'loginsub',
          component: LoginSub
        }
      ]
    }
  ]
})
