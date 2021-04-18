import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue';
import Logout from '../views/auth/Logout.vue';
import Register from "../views/auth/Register";
import ChangePassword from "../views/auth/ChangePassword";
import NotFound from "../views/misc/NotFound";
import Post from "../views/Post";
import Group from "../views/Group";
import AddUpdatePost from "../views/AddUpdatePost";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        props: true
    },
    {
        path: '/new',
        name: 'AddPost',
        component: AddUpdatePost,
    },
    {
        path: '/post/:id/edit',
        name: 'UpdatePost',
        component: AddUpdatePost,
        props: true
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Logout
    },
    {
        path: '/change-password',
        name: 'ChangePassword',
        component: ChangePassword
    },
    {
        path: '/signup',
        name: 'Register',
        component: Register
    },
    {
        path: '/post/:id',
        name: 'Post',
        component: Post,
        props: true
    },
    {
        path: '/group/:slug',
        name: 'Group',
        component: Group,
        props: true
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/404',
        name: '404',
        component: NotFound,
        props: true
    },
    // {
    //     path: "/:catchAll(.*)",
    //     redirect: '/404'
    // }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
})

router.beforeEach((to, from, next) => {
    const publicPages = ['Home', 'Post', 'Register', 'Login', '404', 'Group'];
    const authRequired = !publicPages.includes(to.name);
    const loggedIn = localStorage.getItem('user');
    if (!to.name) {
        next({
            name: '404',
            params: {from_url: to.path}
        })
    }
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router
