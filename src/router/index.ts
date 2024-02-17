import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/pages/Login.vue';
import Home from '@/components/pages/Home.vue';
import View from '@/components/pages/Detail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:id',
      name: 'view',
      component: View
    }
  ]
});

export default router;
