// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import elementUI from 'element-ui';
import Vuex from 'vuex';
import axios from 'axios';

Vue.prototype.axios = axios;

Vue.use(Vuex);
const store = new Vuex.Store({
	//Vuex的配置
	state: {
		//定义数据
		user:{state:false,imgSrc:require('./assets/calf.jpg'),username:'默认'},
	},
	mutations: {
		//修改state中数据的方法
		login(state,imgSrc,username){
			state.user.state = !state.user.state;
			state.user.imgSrc = imgSrc;
			state.user.username = username;
		},
		logout(state){
			state.user.state = !state.user.state;
			state.user.imgSrc = require('./assets/calf.jpg');
			state.user.username = '默认';
		}
	}
});

Vue.use(elementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
