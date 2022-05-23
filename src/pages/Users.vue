<template>
  <TableData v-if="usersProps.length>0 && usersData.length>0" :data_header="usersProps" :data_body="usersData"  />
</template>

<script setup>

  import {onBeforeMount, ref} from "vue";
  import * as APIHandler from "../lib/APIHandler";
  import TableData from "../components/TableData";

  const usersProps = ref([]);
  const usersData = ref([]);

  onBeforeMount(async () => {
    let users = await APIHandler.get("users").then(response => response.json());
    if(users){
      usersData.value = users;
      usersData.value.forEach(prop => {
        if (prop.hasOwnProperty("role") && typeof prop.role === "object") {
          prop.role = prop.role.name;
        }
      })
      usersProps.value = Object.keys(users[0]);
    }

  });

</script>

<style scoped>

</style>