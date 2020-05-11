import Vue from 'vue';
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:5000/api/ContactRecords',
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
  getContacts() {
    const contacts = this.makeRequest('GET', '/');
    return contacts;
  },
  createNewContact(data) {
    return this.makeRequest('POST', '/', data);
  },
  updateContact(id, data) {
    return this.makeRequest('PUT', `/${id}`, data);
  },
  deleteContact(id) {
    return this.makeRequest('DELETE', `/${id}`);
  },
};
