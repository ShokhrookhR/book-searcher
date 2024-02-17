import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '@/components/pages/Login.vue';
import Home from '@/components/pages/Home.vue';
import View from '@/components/pages/Detail.vue';
import { RouterNames } from '@/constants/index.ts';
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
router.beforeEach((to, from, next) => {
  const isAuthenticated = Boolean(sessionStorage.getItem('isAuthenticated') === 'authenticated');
  if (to.name !== RouterNames.Login && !isAuthenticated) next({ name: RouterNames.Login });
  else next();
});
export default router;
