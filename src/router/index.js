import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import AnalyticsView from '../views/AnalyticsView.vue'
import AlertManagerView from '../views/AlertManagerView.vue'
import SettingView from '../views/SettingView.vue'

const defaultRoute = {
  path: '/',
  redirect: '/dashboard',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    defaultRoute,
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: AnalyticsView,
    },
    {
      path: '/alert-manager',
      name: 'alert-manager',
      component: AlertManagerView,
    },
    {
      path: '/setting',
      name: 'setting',
      component: SettingView,
    },
  ],
})

export default router
