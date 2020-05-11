<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-toggle target="top-nav"></b-navbar-toggle>
    <b-navbar-brand>
      <span v-if="activeUser && activeUser.name">{{activeUser.name}}'s </span>Rolodex
    </b-navbar-brand>
    <b-collapse is-nav id="top-nav">
      <b-navbar-nav>
        <b-nav-item
          href="/"
          v-if="authenticated"
          @click="clearActiveUser"
          >Return to User List</b-nav-item>
        <b-nav-item
          href="#"
          @click.prevent="$emit('login')"
          v-if="!authenticated"
          >Login</b-nav-item>
        <b-nav-item href="#" @click.prevent="$emit('logout')" v-else>Logout</b-nav-item>
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
      const needToSetUser = this.activeUser === null
      || (
        current.params
        && current.params.activeUser
        && this.activeUser.id !== current.params.activeUser.id);

      if (needToSetUser) {
        this.activeUser = current.params.activeUser;
      }
    },
  },
  watch: {
    $route: 'updateActiveUser',
  },
};
</script>
