import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/EstadoClima',
      name: 'EstadoClima',
      component: () => import('../views/EstadoClimaView.vue')
    },
    {
      path: "/Pronosticos/:lugar",
      name: "Pronosticos",
      props: true,
      component: () => import('../views/PronosticosView.vue')
    },
  ]
})

export default router
