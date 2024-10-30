<script setup>
import axios from "axios";
import { rows, selectedRow, form } from "src/composables/Users";
import { useRouter } from "vue-router";

const router = useRouter();

const addUser = async () => {
  if (!validateUser(form.value)) {
    return;
  }
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      form.value
    );
    rows.value.push(response.data);
    resetForm();
    router.push({ name: "users" });
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

const validateUser = (newUser) => {
  const index = rows.value.findIndex(
    (user) => user.username === newUser.username || user.email === newUser.email
  );

  if (index !== -1) {
    const existingUser = rows.value[index];
    alert(`User ${existingUser.username} already exists!`);
    return false;
  } else {
    return true;
  }
};

const updateUser = async () => {
  try {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${selectedRow.value.id}`,
      form.value
    );
    const index = rows.value.findIndex((user) => user.id === form.value.id);
    if (index !== -1) {
      rows.value[index] = response.data;
    }
    resetForm();
    router.push({ name: "users" });
  } catch (error) {
    console.error("Error updating user: ", error);
  }
};

const resetForm = () => {
  form.value = {
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  };
};
</script>

<template>
  <div class="q-px-lg q-mb-lg">
    <h4 class="q-mb-md">Add User</h4>
    <q-form
      @submit="!selectedRow.id ? addUser() : updateUser()"
      class="column q-gutter-y-md justify-end items-start"
      autocomplete
    >
      <div class="column q-gutter-y-md">
        <div class="row q-gutter-y-md">
          <h5 class="q-my-none">Personal Information</h5>
          <div class="row q-gutter-x-md" style="width: 100%">
            <div class="q-gutter-y-sm col">
              <label>Name</label>
              <q-input v-model="form.name" outlined />
            </div>
            <div class="q-gutter-y-sm col">
              <label>Username</label>
              <q-input v-model="form.username" outlined />
            </div>
          </div>
          <div class="row q-gutter-x-md" style="width: 100%">
            <div class="q-gutter-y-sm col">
              <label>Email</label>
              <q-input v-model="form.email" outlined />
            </div>
            <div class="q-gutter-y-sm col">
              <label>Phone</label>
              <q-input v-model="form.phone" outlined />
            </div>
          </div>
          <div class="row q-gutter-x-md" style="width: 100%">
            <div class="q-gutter-y-sm col">
              <label>Website</label>
              <q-input v-model="form.website" outlined />
            </div>
          </div>
        </div>

        <div class="row q-gutter-y-md">
          <h5 class="q-my-none">Address</h5>
          <div class="row q-gutter-x-md" style="width: 100%">
            <div class="q-gutter-y-sm col">
              <label>Street</label>
              <q-input v-model="form.address.street" outlined />
            </div>
            <div class="q-gutter-y-sm col">
              <label>Suite</label>
              <q-input v-model="form.address.suite" outlined />
            </div>
          </div>
          <div class="row q-gutter-x-md" style="width: 100%">
            <div class="q-gutter-y-sm col">
              <label>City</label>
              <q-input v-model="form.address.city" outlined />
            </div>
            <div class="q-gutter-y-sm col">
              <label>Zipcode</label>
              <q-input v-model="form.address.zipcode" outlined />
            </div>
          </div>
          <div class="row q-gutter-x-md" style="width: 100%">
            <div class="q-gutter-y-sm col">
              <label>Latitude</label>
              <q-input v-model="form.address.geo.lat" outlined />
            </div>
            <div class="q-gutter-y-sm col">
              <label>Longitude</label>
              <q-input v-model="form.address.geo.lng" outlined />
            </div>
          </div>
        </div>

        <div class="row q-gutter-y-md">
          <h5 class="q-my-none">Company</h5>
          <div class="row q-gutter-x-md" style="width: 100%">
            <div class="q-gutter-y-sm col">
              <label>Company Name</label>
              <q-input v-model="form.company.name" outlined />
            </div>
            <div class="q-gutter-y-sm col">
              <label>Catch Phrase</label>
              <q-input v-model="form.company.catchPhrase" outlined />
            </div>
          </div>
          <div class="row q-gutter-x-md" style="width: 100%">
            <div class="q-gutter-y-sm col">
              <label>BS</label>
              <q-input v-model="form.company.bs" outlined />
            </div>
          </div>
        </div>
      </div>

      <q-btn
        color="primary"
        :label="!selectedRow.id ? 'Add' : 'Update'"
        type="submit"
      />
    </q-form>
  </div>
</template>
