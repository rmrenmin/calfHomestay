// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import Axios from 'axios'
import Qs from 'qs'
import { Tabbar, TabbarItem,Group, Cell,XHeader,Flexbox, FlexboxItem,ViewBox,Divider,XButton} from 'vux'
import  { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)

Vue.component('tabbar', Tabbar)
Vue.component('tabbar-item', TabbarItem)
Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('x-header', XHeader)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('view-box', ViewBox)
Vue.component('divider', Divider)
Vue.component('x-button', XButton)
Vue.prototype.axios = Axios;
Vue.prototype.qs = Qs;
FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
