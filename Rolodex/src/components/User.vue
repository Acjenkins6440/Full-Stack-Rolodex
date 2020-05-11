<template>
  <tr v-if="editing === false">
    <td>{{user.name}}</td>
    <td>
      <b-button
        :to="{ name: 'contact-list', params: { activeUser: user }, }"
      >View User</b-button>
    </td>
    <td><b-button @click="$emit('removeUser', index)">Delete</b-button></td>
  </tr>
  <tr v-else>
    <td>
      <b-form-input
        :disabled="loading"
        type="text"
        class="form-control"
        v-model="user.name"
        :id="'nameInput' + index"></b-form-input>
    </td>
    <td>
      <b-button @click="$emit('saveUser', index)">Save</b-button>
    </td>
    <td>
      <b-button @click="$emit('removeUser', index)">Delete</b-button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
    };
  },
  props: ['user', 'editing', 'index', 'loading'],
  computed: {
    name() {
      return this.user.name;
    },
  },
};
</script>
