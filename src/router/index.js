import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),  
  linkActiveClass: "active",
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
    {
      path: "/Favoritos",
      name: "Favoritos",
      props: true,
      component: () => import('../views/FavoritosView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    },
  ]
})

export default router
