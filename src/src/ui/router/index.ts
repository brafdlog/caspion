import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '../components/App.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'App',
    component: App,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
