<template>
  <ModalComponent
    v-if="dialogVisible"
    :dialog-visible="dialogVisible"
    :title="titleModal"
    @update:dialog-visible="updateVisible"
  >
    <FormStreet
      @update:dialog-visible="updateVisible"
      @reload="reloadData"
      :edit-data="edit_data"
    />
  </ModalComponent>
  <TableData
    v-if="streetsProps.length>0 && streetsData.length>0"
    :data-header="streetsProps"
    :data-body="streetsData"
    :object-router="singleStreetProps"
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

  import TableData from "../components/TableData";
  import {onBeforeMount, ref} from "vue";
  import * as APIHandler from "../lib/APIHandler";
  import ModalComponent from "../components/ModalComponent";
  import FormStreet from "../components/FormStreet";
  import SpinnerLoader from "../components/SpinnerLoader";
  import CreateButton from "../components/CreateButton";

  const streetsProps = ref([]);
  const streetsData = ref([]);
  const dialogVisible = ref(false);
  const titleModal = ref('');
  const component = ref(0);
  const edit_data = ref(undefined);

  const singleStreetProps = ref({ name: 'Street', params: { Street: '' }});

  onBeforeMount(async () => {
    await fetchStreetsElements();
  })

  const updateVisible = (value) => {
    dialogVisible.value = value;
  }

  const createNew = () => {
    titleModal.value = "Crear calle";
    dialogVisible.value = true;
  }

  const updateData = (record) => {
    titleModal.value = "Editar Calle";
    edit_data.value = record.name;
    dialogVisible.value = true;
  }

  const reloadData = async () => {
    await fetchStreetsElements();
    component.value++;
  }

  const fetchStreetsElements = async () => {
    const streets = await APIHandler.get('streets').then(response => response.json());
    if(streets) {
      streetsData.value = streets;
      streetsProps.value = Object.keys(streets[0]);
    }
  }


</script>

<style scoped>

</style>