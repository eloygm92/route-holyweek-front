<template>
  <ModalComponent
    v-if="dialogVisible"
    :dialog-visible="dialogVisible"
    :title="titleModal"
    @update:dialog-visible="updateVisible"
  >
    <CreateUser
      @update:dialog-visible="updateVisible"
      @reload="reloadData"
      :edit-data="edit_data"
    />
  </ModalComponent>
  <TableData
    v-if="usersProps.length>0 && usersData.length>0"
    :data-header="usersProps"
    :data-body="usersData"
    :object-router="singleUserProps"
    :key="component"
    @update="updateData($event)"
  >
    <CreateButton @click="createNew" />
  </TableData>
  <div
    v-else
    class="flex h-screen justify-center items-center -mt-10"
  >
    <SpinnerLoader />
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
  const edit_data = ref(undefined);

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

  const updateData = (record) => {
    titleModal.value = "Editar Usuario";
    edit_data.value = record._id;
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
        if (typeof prop.role === "object" && Object.hasOwn(prop,'role')) {
          prop.role = prop.role.name;
        }
      })
      usersProps.value = Object.keys(users[0]);
    }
  }

</script>

<style scoped>

</style>