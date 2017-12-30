import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import axios from 'axios'
import router from './router'
import 'element-ui/lib/theme-chalk/display.css';
import FBSignInButton from 'vue-facebook-signin-button';
 
Vue.use(FBSignInButton);

Vue.use(router)
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  template : `<App/>`,
  components : {App}
})
