import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import User from '@/components/user/User'
import Login from '@/components/user/Login'
import Register from '@/components/user/Register'
import Info from '@/components/user/Info'
import Account from '@/components/user/infonav/Account'
import Order from '@/components/user/infonav/Order'
import House from '@/components/user/infonav/House'
import Style from '@/components/Style'
import HouseInfo from '@/components/HouseInfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/user',//测试用
      name: 'User',
      component: User
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/info',//个人信息中心
      name: 'Info',
      component: Info,
      children:[
      	{//账户管理
      		path:'account',
      		name:'Account',
      		component:Account,
      	},{//订单管理
      		path:'order',
      		name:'Order',
      		component:Order,
      	},{//房源管理
      		path:'house',
      		name:'House',
      		component:House,
      	},
        
      ]
      
    },
    {
      path: '/style',//每个风格的房屋列表
      name: 'Style',
      component: Style
    },
    {
      path: '/houseinfo',//个人信息中心
      name: 'HouseInfo',
      component: HouseInfo
    },
  ]
})
