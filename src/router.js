import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Users from "@/pages/Users";
import Streets from "@/pages/Streets";
import Street from "@/pages/Street";
import {useCookies} from "vue3-cookies";

const routes = [
    { path: '/', redirect: '/login'},
    { path: '/login', name: 'Login', component: Login , meta: { requiresAuth: false }},
    { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true }},
    { path: '/users', name: 'Users', component: Users, meta: { requiresAuth: true }},
    { path: '/streets', name: 'Streets', component: Streets, meta: { requiresAuth: true }},
    { path: '/street', name: 'Street', component: Street, meta: { requiresAuth: true }, props: true },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const { cookies } = useCookies();

router.beforeEach((to, from, next) => {
    const isAuthenticated = cookies.get('jwt_token')
    if (to.name !== 'Login' && !isAuthenticated ) next({ name: 'Login' })
    else if (to.name === 'Login' && isAuthenticated) next({ name: 'Dashboard' })
    else {
        if (to.name === 'Street' && from.name !== 'Streets')
            next({name: 'Streets'})
        else
            next()
    }
})

export default router;