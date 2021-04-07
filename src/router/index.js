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
import Client from '../views/Client.vue'
import LogWorkout from "@/views/Client/LogWorkout";
import Statistics from "@/views/Client/Statistics";
import Calendar from "@/views/Client/Calendar";
import Event from "@/views/Client/Event";
import Settings from "@/views/Settings";
import Account from "@/views/Settings/Account";
import Security from "@/views/Settings/Security";
import Overview from "@/views/Home/Overview";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/overview',
    meta: { trainer: true },
    children: [
      {
        path: '/overview',
        name: 'Overview',
        component: Overview,
      },
      {
        path: '/exercises',
        name: 'Exercises',
        component: Exercises,
      },
      {
        path: '/workouts',
        name: 'Workouts',
        component: Workouts
      },
      {
        path: '/messages',
        name: 'Messages',
        component: Messages,
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
    path: '/client',
    name: 'Client',
    component: Client,
    redirect: '/client/calendar/events',
    meta: { client: true },
    children: [
      {
        path: 'workout/:id/log',
        name: 'LogWorkout',
        component: LogWorkout
      },
      {
        path: 'messages',
        name: 'ClientMessages',
        component: Messages,
      },
      {
        path: 'statistics',
        name: 'Statistics',
        component: Statistics,
      },
      {
        path: 'calendar/events',
        name: 'Calendar',
        component: Calendar,
      },
      {
        path: 'calendar/events/:id',
        name: 'Event',
        component: Event,
      },
    ]
  },
  {
    path: '/settings',
    name: 'Settings',
    redirect: '/settings/account',
    component: Settings,
    children: [
      {
        path: 'account',
        name: 'Account',
        component: Account
      },
      {
        path: 'security',
        name: 'Security',
        component: Security,
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
  /* Unguarded paths */
  {
    path: '/email/verify/:token',
    name: 'VerifyEmail',
    component: () => import('../views/Mail/VerifyEmail.vue'),
    meta: { unguarded: true }
  },
  {
    path: '/users/invite/:token',
    name: 'InviteUser',
    component: () => import('../views/Mail/InviteUser.vue'),
    meta: { unguarded: true }
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

  /* Let all unguarded routes pass */
  if (to.matched.some(path => path.meta.unguarded)) {
    return next();
  }

  /* If user is not authenticated and path is not for guests then whe should block further action */
  if (!store.state.auth.accessToken && !to.matched.some(path => path.meta.guest)) {
    return next({ name: 'Login' });
  }

  /* If user is authenticated and path is for guests then whe should block further action */
  if (store.state.auth.accessToken && to.matched.some(path => path.meta.guest)) {
    return next({ name: 'Home' });
  }

  /* If path only for trainers check is user a trainer and can access this path (admins have full access) */
  if (to.matched.some(path => path.meta.trainer &&
      store.state.auth.user.role !== 'trainer' &&
      store.state.auth.user.role !== 'admin'
  )) {
    return next({ name: 'Client' });
  }

  /* If path is created for client and admin/trainer did not enabled user view mode redirect back to clients page */
  if(to.matched.some(path => path.meta.client) && store.state.auth.user.role !== 'user' && !store.state.auth.clientId) {
    return next({ name: 'Clients' });
  }

  return next();
});

export default router
