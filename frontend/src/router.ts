import { createRouter, createWebHistory, Router, RouteRecordRaw } from "vue-router";

import DefaultLayout from './components/DefaultLayout.vue'
import AuthLayout from './components/AuthLayout.vue'
import Dashboard from './views/Dashboard.vue'
import Surveys from './views/Surveys.vue'
import SurveyView from './views/SurveyView.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import { useUserStore } from './stores/user'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard',
        component: DefaultLayout,
        meta: {requiresAuth: true},
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: '/surveys',
                name: 'Surveys',
                component: Surveys
            },
            {
                path: '/surveys/create',
                name: 'SurveyCreate',
                component: SurveyView
            },
            {
                path: '/surveys/:id',
                name: 'SurveyView',
                component: SurveyView
            }
        ]
    },
    {
        path: '/auth',
        name: 'Auth',
        redirect: '/login',
        component: AuthLayout,
        meta: {isGuest: true}, 
        children: [
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
        ]
    },
]

const router: Router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    if(to.meta.requiresAuth && !userStore.token) {
        next({name: 'Login'})
    }
    else if(userStore.token && to.meta.isGuest) {
        next({name: 'Dashboard'})
    } else {
        next();
    }
})

export default router