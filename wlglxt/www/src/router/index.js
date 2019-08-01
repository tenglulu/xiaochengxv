import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/home'
import TruckMana from '@/components/truck/TruckMana'
import DriverMana from '@/components/drivers/DriverMana'
import Scheduling from '@/components/scheduling/Scheduling'
import Peisong from '@/components/scheduling/Peisong'
import WriteOrder from '@/components/task/WriteOrder'
import User from '@/components/sys/User'




Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Lgonin',
      hidden: true,
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      hidden: true,
      component: Register
    },
    {
      path: '/home',
      name: 'Home',
      hidden: true,
      component: Home
    },
    {
      path: '/home',
      name: '车辆管理',
      component: Home,
      children: [{
        path: '/truckmana',
        name: '车辆信息管理',
        component: TruckMana
      }, ]
    },
    {
      path: '/home',
      name: '驾驶员管理',
      component: Home,
      children: [{
        path: '/drivermana',
        name: '驾驶员信息管理',
        component: DriverMana
      }]
    },
    {
      path: '/home',
      name: '订单配送点管理',
      component: Home,
      children: [{
        path: '/peisong',
        name: '配送点管理',
        component: Peisong
      }, {
        path: '/scheduling',
        name: '订单管理',
        component: Scheduling
      }]
    },
    {
      path: '/home',
      name: '配送点任务',
      component: Home,
      children: [{
        path: '/writeorder',
        name: '订单费用管理',
        component: WriteOrder
      }]
    },
    {
      path: '/home',
      name: '用户模块',
      component: Home,
      meta: {
        role: ['系统管理员', '超级管理员']
      },
      children: [{
        path: '/user',
        name: '用户查询',
        component: User
      }]
    }
  ]
})
