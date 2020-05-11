import Vue from 'vue';
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:5000/api/Users',
  json: true,
});

export default {
  async makeRequest(method, endpoint, data) {
    const accessToken = await Vue.prototype.$auth.getAccessToken();
    return client({
      method,
      url: endpoint,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((resp) => resp.data)
      .catch((err) => {
        console.log(err);
      });
  },
  getUsers() {
    const users = this.makeRequest('GET', '/');
    return users;
  },
  updateUser(id, data) {
    return this.makeRequest('PUT', `/${id}`, data);
  },
  createNewUser(data) {
    return this.makeRequest('POST', '/', data);
  },
  deleteUser(id) {
    return this.makeRequest('DELETE', `/${id}`);
  },
};
