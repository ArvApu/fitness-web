import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Exercises from '../views/Exercises.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/exercises',
    name: 'Exercises',
    component: Exercises
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { guest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { guest: true }
  },
  /* Default route - not found */
  {
    path: '/not-found',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  },
  {
    path: '*',
    redirect: '/not-found'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(function(to, from, next) {

  /* If user is not authenticated and path is not for guests then whe should block further action */
  if (!store.state.auth.accessToken && !to.matched.some(path => path.meta.guest)) {
    next({ name: 'Login' });
  }

  next();
});

export default router
