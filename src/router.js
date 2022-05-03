import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import CheckPermission from "@/components/CheckPermission";

const routes = [
    { path: '/', redirect: '/login'},
    { path: '/login', name: 'Login', component: Login },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;