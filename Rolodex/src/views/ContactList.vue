<template>
  <div class="container-fluid mt-4 main-container">
    <div v-if="loading">
      <h1>Loading...</h1>
    </div>
    <div v-else-if="contacts">
      <b-row class="top-button-row">
        <b-button @click="addContact">Add New Contact</b-button>
      </b-row>
      <b-row>
        <table class="table" id="contact-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Notes</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <Contact
              v-for="(contact, index) in contactPage"
              @editContact="beginContactEdit"
              @saveContact="updateContact"
              @removeContact="removeContact"
              :loading="index === loadingIndex"
              :key="index"
              :index="index"
              :contact="contact"
              :editing="index === editingIndex"/>
          </tbody>
        </table>
      </b-row>
      <b-pagination
        v-model="currentPage"
        :total-rows="contacts.length"
        :per-page="10"
        align="center"
        aria-controls="contact-table"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import Contact from '@/components/Contact.vue';
import api from '@/ContactsApiService.js';

export default {
  name: 'ContactList',
  components: {
    Contact,
  },
  data() {
    return {
      loading: false,
      contacts: null,
      emptyContact: {
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        notes: '',
        userId: '',
      },
      editingIndex: null,
      loadingIndex: null,
      currentPage: 1,
    };
  },
  methods: {
    beginContactEdit(index) {
      this.editingIndex = index;
    },
    addContact() {
      const newEmptyContact = { ...this.emptyContact, userId: this.activeUser.id };
      this.contacts.push(newEmptyContact);
      this.editingIndex = this.contacts.length - 1;
      if (this.editingIndex > 9) {
        this.currentPage = Math.ceil(this.contacts.length / 10);
        this.editingIndex = this.contactPage.length - 1;
      }
    },
    initUserStorage() {
      if (!localStorage.activeUser || localStorage.activeUser !== this.$route.params.activeUser) {
        localStorage.setItem('activeUser', JSON.stringify(this.$route.params.activeUser));
      }
    },
    async removeContact(index) {
      const contact = this.contacts[index];
      try {
        await api.deleteContact(contact.id);
      } finally {
        this.contacts = [
          ...this.contacts.slice(0, index),
          ...this.contacts.slice(index + 1, this.contacts.length),
        ];
      }
    },
    async updateContact(index) {
      const contact = this.contacts[index];
      const needsToBeAdded = !this.contacts[index].id;
      this.loadingIndex = index;
      try {
        if (needsToBeAdded) {
          await api.createNewContact(contact);
        } else {
          await api.updateContact(contact.id, contact);
        }
      } finally {
        this.loadingIndex = null;
        this.editingIndex = null;
      }
    },
    async loadContacts() {
      this.loading = true;
      try {
        this.contacts = await api.getContacts(this.activeUser.id);
      } finally {
        this.contacts.sort((a, b) => ((a.name > b.name) ? 1 : -1));
        this.loading = false;
      }
    },
  },
  async mounted() {
    if (this.$route.params && this.$route.params.activeUser) {
      this.initUserStorage();
    }
    if (!this.contactsLoaded) {
      this.loadContacts(this.activeUser);
    }
  },
  computed: {
    contactsLoaded() {
      return this.contacts !== null;
    },
    activeUser() {
      return JSON.parse(localStorage.activeUser);
    },
    contactPage() {
      return (this.contacts)
        ? this.contacts.slice((this.currentPage * 10) - 10, this.currentPage * 10)
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
