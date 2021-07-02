import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue';
import Logout from '../views/auth/Logout.vue';
import Register from "../views/auth/Register";
import ChangePassword from "../views/auth/ChangePassword";
import NotFound from "../views/misc/NotFound";
import Post from "../views/Post";
import Group from "../views/Group";
import AddUpdatePost from "../views/AddUpdatePost";
import Profile from "../views/Profile";
import Follow from "../views/Follow";
import Search from "../views/Search";
import Tag from "../views/Tag";
import About from "../views/misc/About";
import Tech from "../views/misc/Tech";

const routes = [
    {
        path: '/blog/',
        name: 'Home',
        component: Home,
        props: true
    },
    {
        path: '/blog/new',
        name: 'AddPost',
        component: AddUpdatePost,
    },
    {
        path: '/blog/post/:id/edit',
        name: 'UpdatePost',
        component: AddUpdatePost,
        props: true
    },
    {
        path: '/blog/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/blog/logout',
        name: 'Logout',
        component: Logout
    },
    {
        path: '/blog/change-password',
        name: 'ChangePassword',
        component: ChangePassword
    },
    {
        path: '/blog/signup',
        name: 'Register',
        component: Register
    },
    {
        path: '/blog/post/:id',
        name: 'Post',
        component: Post,
        props: true
    },
    {
        path: '/blog/group/:slug',
        name: 'Group',
        component: Group,
        props: true
    },
    {
        path: '/blog/tag/:slug',
        name: 'Tag',
        component: Tag,
        props: true
    },
    {
        path: '/blog/posts',
        name: 'Search',
        component: Search,
        props: true
    },
    {
        path: '/blog/:username',
        name: 'Profile',
        component: Profile,
        props: true
    },
    {
        path: '/blog/follow',
        name: 'Follow',
        component: Follow,
    },
    {
        path: '/blog/about-author',
        name: 'About',
        component: About,
    },
    {
        path: '/blog/about-tech',
        name: 'Tech',
        component: Tech,
    },
    {
        path: '/blog/404',
        name: '404',
        component: NotFound,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
})

router.beforeEach((to, from, next) => {
    const publicPages = ['Home', 'Post', 'Register', 'Login', '404', 'Group', 'Profile', 'Search', 'Tag', 'About', 'Tech'];
    const authRequired = !publicPages.includes(to.name);
    const loggedIn = localStorage.getItem('user');
    if (!to.name || to.name === 'Search' && !to.query.search) {
        next({
            name: '404',
            params: {from_url: to.path}
        })
    }
    if (authRequired && !loggedIn) {
        next({name: 'Login'});
    } else {
        next();
    }
});

export default router
