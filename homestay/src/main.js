// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import elementUI from 'element-ui';
import Vuex from 'vuex';
import axios from 'axios';
import qs from 'qs';

//import header from './assets/calf.jpg';

//axios.defaults.withCredentials=true;
Vue.prototype.axios = axios;
Vue.prototype.qs = qs;

Vue.use(Vuex);
const store = new Vuex.Store({
	//Vuex的配置
	state: {
		//定义数据
		user: {
			state: false,
			imgSrc: null,
			username: null,
			tel : null,
			sex : null,
			nickname : null,
			birthday : null,
		},
	},
	mutations: {
		//修改state中数据的方法
		login(state, obj) {
//			console.log(obj)
			if(!obj.username) return;
			state.user.state = !state.user.state;
			state.user.imgSrc = obj.imgSrc;
			state.user.username = obj.username;
			state.user.tel = obj.tel;
			state.user.sex = obj.sex;
			state.user.nickname = obj.nickname;
			state.user.birthday = obj.birthday;
		},
		logout(state) {
			state.user.state = !state.user.state;
			state.user.imgSrc = null;
			state.user.username = null;
			state.user.tel = null;
			state.user.sex = null;
			state.user.nickname = null;
			state.user.birthday = null;
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
	components: {
		App
	},
	template: '<App/>'
})