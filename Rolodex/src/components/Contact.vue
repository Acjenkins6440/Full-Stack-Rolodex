<template>
  <tr v-if="editing === false">
    <td>{{contact.name}}</td>
    <td>{{contact.phoneNumber}}</td>
    <td>{{contact.email}}</td>
    <td>{{contact.address}}</td>
    <td>{{contact.notes}}</td>
    <td><b-button @click="$emit('editContact', index)">Edit</b-button></td>
    <td><b-button @click="$emit('removeContact', index)">Delete</b-button></td>
  </tr>
  <tr v-else>
    <td>
      <b-form-input
        :disabled="loading"
        type="text"
        class="form-control"
        v-model="contact.name"
        :id="'nameInput' + index"></b-form-input>
    </td>
    <td>
      <b-form-input
        :disabled="loading"
        type="tel"
        class="form-control"
        v-model="contact.phoneNumber"
        :id="'phoneInput' + index"></b-form-input>
    </td>
    <td>
      <b-form-input
        :disabled="loading"
        type="email"
        class="form-control"
        v-model="contact.email"
        aria-describedby="emailHelp"
        :id="'emailInput' + index"></b-form-input>
    </td>
    <td>
      <b-form-textarea
        :disabled="loading"
        type="text"
        class="form-control"
        v-model="contact.address"
        rows="3"
        max-rows="5"
        :id="'addressInput' + index"></b-form-textarea>
    </td>
    <td>
      <b-form-input
        :disabled="loading"
        type="text"
        class="form-control"
        v-model="contact.notes"
        :id="'notesInput' + index"></b-form-input>
    </td>
    <td>
      <b-button @click="$emit('saveContact', index)">Save</b-button>
    </td>
    <td>
      <b-button @click="$emit('removeContact', index)">Delete</b-button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
    };
  },
  props: ['contact', 'editing', 'index', 'loading'],
  methods: {

  },
  computed: {
  },
};
</script>
