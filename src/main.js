import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import {postRequest} from "./utils/api";
import {postValueRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {initMenu} from "./utils/menus";
import 'font-awesome/css/font-awesome.min.css'

Vue.prototype.postRequest=postRequest;
Vue.prototype.postValueRequest=postValueRequest;
Vue.prototype.putRequest=putRequest;
Vue.prototype.getRequest=getRequest;
Vue.prototype.deleteRequest=deleteRequest;


Vue.config.productionTip = false
Vue.use(ElementUI,{size:'small'});

router.beforeEach((to, from, next) => {
  console.log(to.path+"####"+from.path)
  //如果去登录页面
  if (to.path==='/'){
    console.log("登录首页")
    next();
  } else {
    if(window.sessionStorage.getItem("user")){
      console.log("有用户资料")
      initMenu(router,store);
      next();
    }else{
      console.log(to);
      //没有登录 进行跳转到登录界面
      next("/?redirect"+to.path);
    }

  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
