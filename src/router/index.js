import Vue from 'vue'
import VueRouter from 'vue-router'
// eslint-disable-next-line no-unused-vars
import Login from '../views/Login'
import Home from "../views/Home";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden:true
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    hidden:true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
