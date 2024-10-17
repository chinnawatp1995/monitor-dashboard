import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/DashboardView.vue'
import AnalyticsView from '../views/AnalyticsView.vue'
import AlertManager from '../views/AlertManagerView.vue'
import Setting from '../views/SettingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: AnalyticsView,
    },
    {
      path: '/alert-manager',
      name: 'alert-manager',
      component: AlertManager,
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
    },
  ],
})

export default router
