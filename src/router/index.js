import Vue from 'vue'
import VueRouter from 'vue-router'
// eslint-disable-next-line no-unused-vars
import Login from '../views/Login'
import Home from "../views/Home";
import Test1 from "../views/Test1";
import Test2 from "../views/Test2";

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
  },
  {
    path: '/home',
    name: '导航一',
    component: Home,
    children:[
      {
        path: '/test1',
        name: '选项1',
        component: Test1
      },
      {
        path: '/test2',
        name: '选项2',
        component: Test2
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
