import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookies'

Vue.use(VueRouter)

const user = [1, 2, 3]

const routerList = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import('views/notFound')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('views/login')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('views/home'),
    meta: { requireAuth: user },
    children: [
      {
        path: '/page/:id',
        name: 'page',
        component: () => import('components/pages/page'),
        meta: { requireAuth: user }
      },
      {
        path: '/page-index',
        name: 'page-index',
        component: () => import('components/pages/index'),
        meta: { requireAuth: user }
      },
      {
        path: '/page1',
        name: 'page1',
        component: () => import('components/pages/page1'),
        meta: { requireAuth: user }
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('components/pages/page2'),
        meta: { requireAuth: user }
      },
      {
        path: '/page3',
        name: 'page3',
        component: () => import('components/pages/page3'),
        meta: { requireAuth: user }
      },
      {
        path: '/page4',
        name: 'page4',
        component: () => import('components/pages/page4'),
        meta: { requireAuth: user }
      },
      {
        path: '/page5',
        name: 'page5',
        component: () => import('components/pages/page5'),
        meta: { requireAuth: user }
      },
      {
        path: '/page6',
        name: 'page6',
        component: () => import('components/pages/page6'),
        meta: { requireAuth: user }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routerList
})

router.beforeEach((to, from, next) => {
  let user = VueCookie.get('USER')
  let requireAuth = to.meta.requireAuth
  let isBool = true

  if (requireAuth) {
    if (user) {
      if (requireAuth.indexOf(Number(user.user_id)) == -1) {
        isBool = false
      }
    } else {
      isBool = false
    }
  }

  if (isBool) {
    next()
  } else {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}

export default router
