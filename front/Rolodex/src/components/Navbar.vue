<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-toggle target="top-nav"></b-navbar-toggle>
    <b-navbar-brand>
      <span v-if="user && user.name">{{user.name}}'s </span>Rolodex
    </b-navbar-brand>
    <b-collapse is-nav id="top-nav">
      <b-navbar-nav>
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
  name: 'Navbar',
  props: ['authenticated', 'user'],
};
</script>
