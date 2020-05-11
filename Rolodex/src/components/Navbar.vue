<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-toggle target="top-nav"></b-navbar-toggle>
    <b-navbar-brand>
      <span v-if="activeUser && activeUser.name">{{activeUser.name}}'s </span>Rolodex
    </b-navbar-brand>
    <b-collapse is-nav id="top-nav">
      <b-navbar-nav class="navbar">
        <b-nav-item
          href="/"
          v-if="$route.name === 'contact-list'"
          @click="clearActiveUser"
          >Return to User List</b-nav-item>
        <b-nav-item
          class="ml-auto"
          href="#"
          @click.prevent="$emit('login')"
          v-if="!authenticated"
          >Login</b-nav-item>
        <b-nav-item
          class="ml-auto"
          href="#"
          @click.prevent="$emit('logout')"
          v-else
        >Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      activeUser: null,
    };
  },
  name: 'Navbar',
  props: ['authenticated'],
  methods: {
    clearActiveUser() {
      localStorage.activeUser = null;
    },
    updateActiveUser(current) {
      const needToSetUser = this.activeUser === null;

      if (needToSetUser && current.params && current.params.activeUser) {
        this.activeUser = current.params.activeUser;
      } else if (needToSetUser) {
        this.activeUser = JSON.parse(localStorage.activeUser);
      }
    },
  },
  mounted() {
    this.updateActiveUser(this.$route);
  },
  watch: {
    $route: 'updateActiveUser',
  },
};
</script>

<style scoped>
.navbar-nav {
  width: 100%;
}
</style>
