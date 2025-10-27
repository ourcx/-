import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
//  {
//    path: '/',
//    component: () => import('../components/Home.vue')
//  },
//  {
//    path: '/about',
//    component: () => import('../components/About.vue')
//  },
//  {
//     path: '/:pathMatch(.*)*',
//     redirect: '/'
//  },
 {
    path:'/Character',
    component: () => import('../components/Character.vue')
 }
];
const router = createRouter({
 history: createWebHashHistory(),
 routes
});
export default router;