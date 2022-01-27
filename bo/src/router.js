import Vue from 'vue';
import Router from 'vue-router';

import Login from './views/Login.vue';
import Home from "./views/Home.vue";
import Edit from "./views/Edit.vue";
import Create from "./views/Create.vue";
import Register from "./views/Register.vue";

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/create',
            name: 'create',
            component: Create
        },
        {
            path: '/edit/:productId',
            name: 'edit',
            component: Edit
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '*',
            redirect: '/',
        },
    ]
})

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
});

