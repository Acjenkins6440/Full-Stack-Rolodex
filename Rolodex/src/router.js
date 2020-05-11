import Vue from 'vue';
import Router from 'vue-router';
import Auth from '@okta/okta-vue';
import Home from './views/Home.vue';

Vue.use(Router);
Vue.use(Auth, {
  issuer: 'https://dev-576355.okta.com/oauth2/default',
  client_id: '0oabq36ls9FE8mrmG4x6',
  redirect_uri: `${window.location.origin}/implicit/callback`,
});

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback(),
    },
  ],
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
