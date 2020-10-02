import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import UserProfile from '../views/UserProfile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user/:userId', // matching the user ID for the path is a goo practice
    name: 'UserProfile',
    component: UserProfile
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
