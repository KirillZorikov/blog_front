import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue';
import Logout from '../views/Logout.vue';
import Post from "@/views/Post";
import Register from "@/views/Register";
import ChangePassword from "@/views/ChangePassword";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/logout',
      component: Logout
    },
    {
      path: '/change-password',
      component: ChangePassword
    },
    {
      path: '/register',
      component: Register
    },
    {
        path: '/post/:id',
        name: 'Post',
        component: Post,
        props: true
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
