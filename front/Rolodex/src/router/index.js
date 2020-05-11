import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from '@okta/okta-vue';
import Home from '../views/Home.vue';

Vue.use(Auth, {
  issuer: 'https://dev-576355.okta.com/oauth2/default',
  clientId: '0oabq36ls9FE8mrmG4x6',
  redirectUri: 'http://localhost:8080/implicit/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
});

const CALLBACK_PATH = '/implicit/callback';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: CALLBACK_PATH,
    component: Auth.handleCallback(),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

Vue.use(VueRouter);

export default router;
