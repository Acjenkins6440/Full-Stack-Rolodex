import Vue from 'vue';
import Router from 'vue-router';
import Auth from '@okta/okta-vue';
import Home from './views/Home.vue';
import ContactList from './views/ContactList.vue';

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
      path: '/contact-list',
      name: 'contact-list',
      component: ContactList,
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback('/'),
    },
  ],
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
