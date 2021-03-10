import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

import Home from '../views/Home.vue'
import Login from '../views/Auth/Login.vue'
import Register from '../views/Auth/Register.vue'
import PasswordReset from '../views/Auth/PasswordReset.vue'
import PasswordChange from '../views/Auth/PasswordChange.vue'
import Exercises from '../views/Home/Exercises.vue'
import Messages from '../views/Home/Messages.vue'
import Workouts from '../views/Home/Workouts.vue'
import Clients from '../views/Home/Clients.vue'
import Workout from '../views/Home/Workout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/exercises',
        name: 'Exercises',
        component: Exercises
      },
      {
        path: '/workouts',
        name: 'Workouts',
        component: Workouts
      },
      {
        path: '/messages',
        name: 'Messages',
        component: Messages
      },
      {
        path: '/clients',
        name: 'Clients',
        component: Clients
      },
      {
        path: '/workout/:id',
        name: 'Workout',
        component: Workout
      },
    ]
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
  {
    path: '/password/reset',
    name: 'PasswordReset',
    component: PasswordReset,
    meta: { guest: true }
  },
  {
    path: '/password/reset/:token',
    name: 'PasswordChange',
    component: PasswordChange,
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

  /* If user is authenticated and path is for guests then whe should block further action */
  if (store.state.auth.accessToken && to.matched.some(path => path.meta.guest)) {
    next({ name: 'Home' });
  }

  next();
});

export default router
