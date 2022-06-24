import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import UsersPage from "@/pages/UsersPage";
import StreetsPage from "@/pages/StreetsPage";
import StreetPage from "@/pages/StreetPage";
import BrotherhoodsPage from "@/pages/BrotherhoodsPage";
import BrotherhoodPage from "@/pages/BrotherhoodPage";
import {useCookies} from "vue3-cookies";

const routes = [
    { path: '/', redirect: '/login'},
    { path: '/login', name: 'Login', component: LoginPage , meta: { requiresAuth: false }},
    { path: '/dashboard', name: 'Dashboard', component: DashboardPage, meta: { requiresAuth: true }},
    { path: '/users', name: 'Users', component: UsersPage, meta: { requiresAuth: true }},
    { path: '/streets', name: 'Streets', component: StreetsPage, meta: { requiresAuth: true }},
    { path: '/street', name: 'Street', component: StreetPage, meta: { requiresAuth: true }, props: true },
    { path: '/brotherhoods', name: 'Brotherhoods', component: BrotherhoodsPage, meta: { requiresAuth: true }},
    { path: '/brotherhood', name: 'Brotherhood', component: BrotherhoodPage, meta: { requiresAuth: true }, props: true },
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
        else if (to.name === 'Brotherhood' && from.name !== 'Brotherhoods')
            next({name: 'Brotherhoods'})
        else
            next()
    }
})

export default router;