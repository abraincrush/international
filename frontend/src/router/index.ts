import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        { path: 'innovation', name: 'innovation', component: () => import('../views/InnovationTraining.vue') },
        { path: 'ai-x', name: 'ai-x', component: () => import('../views/AIX.vue') },
        { path: 'international', name: 'international', component: () => import('../views/InternationalResources.vue') },
        { path: 'personal', name: 'personal', component: () => import('../views/PersonalPath.vue') },
        { path: 'community', name: 'community', component: () => import('../views/OpenCommunity.vue') },
        { path: 'atlas', name: 'atlas', component: () => import('../views/Atlas.vue') },
        { path: 'profile', name: 'profile', component: () => import('../views/PersonalProfile.vue') }
      ]
    }
  ]
})

export default router