<template>
  <Modal
    v-if="dialogVisible"
    :dialog-visible="dialogVisible"
    :title="titleModal"
    @update:dialogVisible="updateVisible"
  >
    <FormStreet
      @update:dialogVisible="updateVisible"
      @reload="reloadData"
    />
  </Modal>
  <TableData
      v-if="streetsProps.length>0 && streetsData.length>0"
      :data_header="streetsProps"
      :data_body="streetsData"
      :object_router="singleStreetProps"
      key="component"
  >
    <CreateButton @click="createNew" />
  </TableData>
  <div v-else class="flex justify-center">
    <SpinnerLoader/>
  </div>
</template>

<script setup>

  import TableData from "../components/TableData";
  import {onBeforeMount, ref} from "vue";
  import * as APIHandler from "../lib/APIHandler";
  import Modal from "../components/Modal";
  import FormStreet from "../components/FormStreet";
  import SpinnerLoader from "../components/SpinnerLoader";
  import CreateButton from "../components/CreateButton";

  const streetsProps = ref([]);
  const streetsData = ref([]);
  const dialogVisible = ref(false);
  const titleModal = ref('');
  const component = ref(0);

  const singleStreetProps = ref({ name: 'Street', params: { Street: '' }});

  onBeforeMount(async () => {
    fetchStreetsElements();
  })

  const updateVisible = (value) => {
    dialogVisible.value = value;
  }

  const createNew = () => {
    titleModal.value = "Crear calle";
    dialogVisible.value = true;
  }

  const reloadData = () => {
    fetchStreetsElements();
    component.value++;
  }

  const fetchStreetsElements = async () => {
    let streets = await APIHandler.get('streets').then(response => response.json());
    if(streets) {
      streetsData.value = streets;
      streetsProps.value = Object.keys(streets[0]);
    }
  }


</script>

<style scoped>

</style>