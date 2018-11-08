import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HouseClass from '@/components/HouseClass'
import Details from '@/components/Details'
import Info from '@/components/Info'
import Order from '@/components/Order'
import Login from '@/components/Login'
import Register from '@/components/Register'
import LoginRegister from '@/components/LoginRegister'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/houseclass',
      name: 'HouseClass',
      component: HouseClass
    },
    {
      path: '/details',
      name: 'Details',
      component: Details
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
    	path:'/login',
    	name:'Login',
    	component:Login
    },
    {
    	path:'/register',
    	name:'Register',
    	component:Register
    },
    {
    	path:'/loginregister',
    	name:'LoginRegister',
    	component:LoginRegister
    }
  ]
})
