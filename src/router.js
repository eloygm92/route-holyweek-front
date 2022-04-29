import { createRouter, createWebHistory } from "vue-router";
import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import Home from "@/components/Home";

const routes = [
    { path: '/', name: 'Home', component: Home},
    { path: '/login', name: 'Login', component: Login },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;