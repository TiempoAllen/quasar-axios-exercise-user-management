<script>
import { rows, fetchUsers, selectedRow, form } from "src/composables/Users";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const router = useRouter();
    const columns = [
      {
        name: "name",
        label: "Name",
        align: "left",
        field: "name",
        sortable: true,
      },
      {
        name: "username",
        label: "Username",
        align: "left",
        field: "username",
        sortable: true,
      },
      {
        name: "email",
        label: "Email",
        align: "left",
        field: "email",
        sortable: true,
      },
      {
        name: "phone",
        label: "Phone",
        align: "left",
        field: "phone",
        sortable: true,
      },
      {
        name: "website",
        label: "Website",
        align: "left",
        field: "website",
        sortable: true,
      },
      {
        name: "company",
        label: "Company",
        align: "left",
        field: (row) => row.company.name,
        sortable: true,
      },
      {
        name: "actions",
        label: "Actions",
        align: "center",
      },
    ];

    const onRowClick = (row) => {
      selectedRow.value = row;
      form.value = { ...row };
      router.push({ name: "add-user" });
    };

    const deleteUser = async (row) => {
      try {
        const response = await axios.delete(
          `https://jsonplaceholder.typicode.com/users/${selectedRow.value.id}`
        );
        if (confirm(`Are you sure you want to delete user ${row.name}?`)) {
          rows.value = rows.value.filter((user) => user.id !== row.id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();

    return {
      columns,
      rows,
      fetchUsers,
      onRowClick,
      deleteUser,
    };
  },
};
</script>

<template>
  <div class="q-px-lg q-mb-lg">
    <h4 class="q-mb-md">Users</h4>
    <div class="q-pa-md">
      <q-table :rows="rows" :columns="columns" row-key="name">
        <template v-slot:body-cell-actions="props">
          <div class="fit row items-center justify-center">
            <q-btn
              flat
              label="Edit"
              color="primary"
              @click="onRowClick(props.row)"
            />
            <q-btn
              flat
              label="Delete"
              color="negative"
              @click="deleteUser(props.row)"
            />
          </div>
        </template>
      </q-table>
    </div>
  </div>
</template>
