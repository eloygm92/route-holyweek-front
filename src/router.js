import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import CheckPermission from "@/components/CheckPermission";
import {useCookies} from "vue3-cookies";

const routes = [
    { path: '/', redirect: '/login'},
    { path: '/login', name: 'Login', component: Login , meta: { requiresAuth: false }},
    { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true }},
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
    else next()
})

export default router;