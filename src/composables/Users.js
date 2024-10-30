import { ref } from "vue";
import axios from "axios";

let fetchedUsers = ref([]);
let rows = ref([]);
let selectedRow = ref({});
let form = ref({
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
    geo: { lat: "", lng: "" },
  },
  company: { name: "", catchPhrase: "", bs: "" },
});

const fetchUsers = async () => {
  if (fetchedUsers.value.length === 0) {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      fetchedUsers.value = response.data;
      rows.value = fetchedUsers.value.slice();
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
};

export { rows, fetchUsers, fetchedUsers, selectedRow, form };
