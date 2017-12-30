import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Login from '../components/Login'
import nav from './auth'

Vue.use(Router)

export default new Router({
    mode : 'history',
    routes : [
        {
            path : '/',
            name : 'HomeRoute',
            component : Home,
            beforeEnter : nav.authNav 
        },
        {
            path : '/login',
            name : 'Login',
            component : Login,
            beforeEnter : nav.globalNav
        }
    ]
})