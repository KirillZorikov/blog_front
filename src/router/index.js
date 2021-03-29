import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/auth/Login.vue';
import Logout from '@/views/auth/Logout.vue';
import Post from "@/views/Post";
import Register from "@/views/auth/Register";
import ChangePassword from "@/views/auth/ChangePassword";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        props: true
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

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/', '/post/:id'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router
