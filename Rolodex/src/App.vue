<template>
  <div id="app">
    <header>
      <Navbar
        @login="login"
        @logout="logout"
        :authenticated="authenticated"/>
    </header>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'app',
  data() {
    return {
      authenticated: false,
      activeUser: {},
    };
  },
  components: {
    Navbar,
  },
  created() { this.isAuthenticated(); },
  watch: {
    $route: 'isAuthenticated',
  },
  methods: {
    async isAuthenticated() {
      this.authenticated = await this.$auth.isAuthenticated();
    },
    login() {
      this.$auth.loginRedirect('/');
    },
    async logout() {
      await this.$auth.logout();
      await this.isAuthenticated();
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.btn, button {
  background-color: #557A95 !important;
}
</style>
