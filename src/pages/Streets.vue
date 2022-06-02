<template>
  <Modal
    v-if="dialogVisible"
    :dialog-visible="dialogVisible"
    :title="titleModal"
    @update:dialogVisible="updateVisible"
  >
    <CreateStreet
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
    <el-row>
      <el-col :span="4" :offset="20">
        <button @click="createNew" class="border-2 p-1 ">Nueva</button>
      </el-col>
    </el-row>
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
  import CreateStreet from "../components/CreateStreet";
  import SpinnerLoader from "../components/SpinnerLoader";

  const streetsProps = ref([]);
  const streetsData = ref([]);
  const dialogVisible = ref(false);
  const titleModal = ref('');
  const component = ref(0);

  const singleStreetProps = ref({ name: 'Street', params: { Street: '' }});

  onBeforeMount(async () => {
    fetchElements();
  })

  const updateVisible = (value) => {
    dialogVisible.value = value;
  }

  const createNew = () => {
    titleModal.value = "Crear calle";
    dialogVisible.value = true;
  }

  const reloadData = () => {
    fetchElements();
    component.value+=1;
  }

  const fetchElements = async () => {
    let streets = await APIHandler.get('streets').then(response => response.json());
    if(streets) {
      streetsData.value = streets;
      streetsProps.value = Object.keys(streets[0]);
    }
  }


</script>

<style scoped>

</style>