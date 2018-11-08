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
import VueLazyload from 'vue-lazyload';
import { Message } from 'element-ui';

//axios.defaults.withCredentials=true;
Vue.prototype.axios = axios;
Vue.prototype.qs = qs;
Vue.prototype.message = Message;

//cookies
//设置cookies
//Vue.prototype.setCookie = function(cname, cvalue, exdays) {
//	var d = new Date();
//	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//	var expires = "expires=" + d.toGMTString();
//	document.cookie = cname + "=" + cvalue + "; " + expires;
//}
//获取cookies
//Vue.prototype.getCookie = function(cname) {
//	var name = cname + "=";
//	var ca = document.cookie.split(';');
//	for(var i = 0; i < ca.length; i++) {
//		var c = ca[i].trim();
//		if(c.indexOf(name) == 0) return c.substring(name.length, c.length);
//	}
//	return "";
//}
Vue.use(VueLazyload);
Vue.use(Vuex);
const store = new Vuex.Store({
	//Vuex的配置
	state: {
		//定义数据
		user: {
			state: false,
			imgSrc: null,
			username: null,
			tel: null,
			sex: null,
			nickname: null,
			birthday: null,
		},
	},
	mutations: {
		//修改state中数据的方法
		loginState(state){
			state.user.state = !state.user.state;
		},
		login(state, obj) {
//			console.log('main.js:登录成功')
			obj.imgSrc? state.user.imgSrc = obj.imgSrc:'';
			state.user.username = obj.username;
			state.user.tel = obj.tel;
			state.user.sex = obj.sex;
			state.user.nickname = obj.nickname;
			state.user.birthday = obj.birthday;
		},
		logout(state) {
			console.log('main.js:退出成功')
			state.user.state = !state.user.state;
			state.user.imgSrc = null;
			state.user.username = null;
			state.user.tel = null;
			state.user.sex = null;
			state.user.nickname = null;
			state.user.birthday = null;
		},
		changeHeader(state, imgsrc) {
			state.user.imgSrc = imgsrc;
			//修改localStorage
			localStorage.setItem('imgSrc', imgsrc)
			console.log('头像修改成功')
		}
	}
});

Vue.use(VueLazyload, {
	// preLoad: 1.3,
	loading: require('./assets/indeximg/house_default_list_img.png'),
	// attempt: 1
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
	beforeCreate: function() { //读取本地存储，将登陆信息写入state
		let user = Object.assign({}, this.$store.state.user); //$store.state只能通过mutations修改
		for(let item in this.$store.state.user) {
			if(user.hasOwnProperty(item)) {
				user[item] = localStorage.getItem(item)
			}
		}
		//将connect.sid设置到cookies
//		let connect = localStorage.getItem('connect.sid');
//		connect!==""&&this.setCookie('connect.sid',connect,30);
		this.$store.commit('login', user);
		if(user.state){
			this.$store.commit('loginState')
		}
		console.log('mian.js检查登录状态', user)
	},
	template: '<App/>'
})