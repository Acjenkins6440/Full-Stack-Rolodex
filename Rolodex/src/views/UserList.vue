<template>
  <div class="container-fluid mt-4 main-container">
    <div v-if="loading">
      <h1>Loading...</h1>
    </div>
    <div v-else-if="users">
      <b-row class="top-button-row">
        <b-button @click="addUser">Add New User</b-button>
      </b-row>
      <b-row>
        <table class="table" id="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <User
              v-for="(user, index) in userPage"
              @editUser="beginUserEdit"
              @saveUser="updateUser"
              @removeUser="removeUser"
              :loading="index === loadingIndex"
              :key="index"
              :index="index"
              :user="user"
              :editing="index === editingIndex"/>
          </tbody>
        </table>
      </b-row>
      <b-pagination
        v-model="currentPage"
        :total-rows="users.length"
        :per-page="10"
        align="center"
        aria-controls="user-table"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import User from '@/components/User.vue';
import api from '@/UserApiService.js';

export default {
  name: 'UserList',
  components: {
    User,
  },
  data() {
    return {
      loading: false,
      users: null,
      emptyUser: {
        name: '',
      },
      editingIndex: null,
      loadingIndex: null,
      currentPage: 1,
    };
  },
  methods: {
    beginUserEdit(index) {
      this.editingIndex = index;
    },
    async removeUser(index) {
      const user = this.users[index];
      try {
        await api.deleteUser(user.id);
      } finally {
        this.users = [
          ...this.users.slice(0, index),
          ...this.users.slice(index + 1, this.users.length),
        ];
      }
    },
    async addUser(index) {
      const newEmptyUser = { ...this.emptyUser };
      let newUser = { ...this.emptyUser };
      this.loadingIndex = index;
      try {
        newUser = await api.createNewUser(newEmptyUser);
      } finally {
        this.loadingIndex = null;
        this.users.push(newUser);
        this.editingIndex = this.users.length - 1;
        if (this.editingIndex > 9) {
          this.currentPage = Math.ceil(this.users.length / 10);
          this.editingIndex = this.userPage.length - 1;
        }
      }
    },
    async updateUser(index) {
      debugger;
      const user = this.users[index];
      this.loadingIndex = index;
      try {
        await api.updateUser(user.id, user);
      } finally {
        this.loadingIndex = null;
        this.editingIndex = null;
      }
    },
    async loadUsers() {
      this.loading = true;

      try {
        this.users = await api.getUsers();
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted() {
    if (!this.usersLoaded) {
      this.loadUsers();
    }
  },
  computed: {
    usersLoaded() {
      return this.users !== null;
    },
    userPage() {
      return (this.users)
        ? this.users.slice((this.currentPage * 10) - 10, this.currentPage * 10)
        : 1;
    },
  },
};
</script>
<style scoped>
  .top-button-row {
    margin-bottom: 20px;
  }
  .main-container {
    width: 90%;
  }
  .btn {
    margin-right: 10px;
  }
  .table {
    table-layout: fixed;
  }
</style>
