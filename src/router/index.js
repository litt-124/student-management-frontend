import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        path: '/',
        redirect: {name: 'login'},
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login/LoginView.vue'),
    },
    {
        path: '/users',
        name: 'users-list',
        component: () => import('@/pages/user/UserView.vue'),
    },
    {
        path: '/user-details/:id',
        name: 'users-details',
        meta: {authenticated: true},
        component: () => import('@/pages/user-details/UserDetailsView.vue'),
    },
    {
        path: '/home-page',
        name: 'home-page',
        component: () => import('@/pages/home-page/HomePageView.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
