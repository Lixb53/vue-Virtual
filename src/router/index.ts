import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import VirtualScroll from '@/components/VirtualScroll.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'VirtualScroll',
    component: VirtualScroll,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
