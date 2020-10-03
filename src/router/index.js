import { createRouter, createWebHistory } from 'vue-router'
import { users } from "../assets/users"
import Home from '../views/Home.vue';
import Admin from '../views/Admin.vue';
import UserProfile from '../views/UserProfile.vue'
import store from '../store/index'

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
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAdmin: true
    }
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next)=>{
  const user = store.state.User.user; // to get variables state from store

  if(!user){
    await store.dispatch('User/setUser', users[0])
  }

  const isAdmin = false;
  const requiresAdmin = to.matched.some(record => record.enterCallbacks.requiresAdmin);

  if(requiresAdmin && !isAdmin) next({name:'Home'});
  else next();
})

export default router
