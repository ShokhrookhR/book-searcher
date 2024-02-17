import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/pages/Login.vue';
import Home from '@/components/pages/Home.vue';
import View from '@/components/pages/Detail.vue';
import { RouterNames } from '@/constants/index.ts';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: RouterNames.Login,
      component: Login
    },
    {
      path: '/',
      name: RouterNames.Home,
      component: Home
    },
    {
      path: '/:id',
      name: RouterNames.View,
      component: View
    }
  ]
});

export default router;
