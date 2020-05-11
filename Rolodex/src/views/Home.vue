<template>
  <div class="home">
    <div v-if="!this.$parent.authenticated" class="welcome">
      <h1>Welcome to the Rolodex!</h1>
      <h3>Please use the "Login" button to get started</h3>
    </div>
    <UserList v-else />
  </div>
</template>

<script>
// import ContactList from './ContactList.vue';
import UserList from './UserList.vue';

export default {
  name: 'Home',
  components: {
    UserList,
  },
  methods: {
    login() {
      this.$auth.loginRedirect('/home');
    },
  },
};
</script>

<style scoped>
.home {
  text-align: center;
}
.welcome{
  margin-top: 20px;
  width: 40%;
  display: inline-block;
}
</style>
