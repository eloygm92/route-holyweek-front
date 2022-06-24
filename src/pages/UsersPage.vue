<template>
  <ModalComponent
    v-if="dialogVisible"
    :dialog-visible="dialogVisible"
    :title="titleModal"
    @update:dialogVisible="updateVisible"
  >
    <CreateUser
      @update:dialogVisible="updateVisible"
      @reload="reloadData"
    />
  </ModalComponent>
  <TableData
    v-if="usersProps.length>0 && usersData.length>0"
    :data_header="usersProps"
    :data_body="usersData"
    :object_router="singleUserProps"
    :key="component"
  >
    <CreateButton @click="createNew" />
  </TableData>
  <div v-else class="flex justify-center">
    <SpinnerLoader/>
  </div>
</template>

<script setup>

  import {onBeforeMount, ref} from "vue";
  import * as APIHandler from "../lib/APIHandler";
  import TableData from "../components/TableData";
  import SpinnerLoader from "../components/SpinnerLoader";
  import CreateButton from "../components/CreateButton";
  import ModalComponent from "../components/ModalComponent";
  import CreateUser from "../components/CreateUser";

  const usersProps = ref([]);
  const usersData = ref([]);
  const dialogVisible = ref(false);
  const titleModal = ref('');
  const component = ref(0);

  const singleUserProps = ref({ name: 'User', params: { User: '' }});

  onBeforeMount(async () => {
    await fetchUsers();
  });

  const updateVisible = (value) => {
    dialogVisible.value = value;
  }

  const createNew = () => {
    titleModal.value = "Crear usuario";
    dialogVisible.value = true;
  }

  const reloadData = async () => {
    await fetchUsers();
    component.value++;
  }

  const fetchUsers = async () => {
    let users = await APIHandler.get("users").then(response => response.json());

    if(users && !users.statusCode){
      usersData.value = users;
      usersData.value.forEach(prop => {
        if (prop.hasOwnProperty("role") && typeof prop.role === "object") {
          prop.role = prop.role.name;
        }
      })
      usersProps.value = Object.keys(users[0]);
    }
  }

</script>

<style scoped>

</style>