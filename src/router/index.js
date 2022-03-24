import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('@/components/IndexLogin.vue')
    },
    {
        path: '/equipos',
        name: 'equipos-gestor',
        component: () => import('@/components/EquipoGestor.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router;