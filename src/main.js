import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import {store} from './store/'
import './assets/css/style.css'
//import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';

//Vue.use(VueRouter)

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(BootstrapVue)
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
