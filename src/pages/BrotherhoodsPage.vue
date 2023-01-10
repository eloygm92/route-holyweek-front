<template>
  <ModalComponent
    v-if="dialogVisible"
    :dialog-visible="dialogVisible"
    :title="titleModal"
    @update:dialog-visible="updateVisible"
  >
    <FormBrotherhood
      @update:dialog-visible="updateVisible"
      @reload="reloadData"
      :edit-data="editData"
    />
  </ModalComponent>
  <TableData
    v-if="brotherhoodsProps.length>0 && brotherhoodsData.length>0"
    :data-header="brotherhoodsProps"
    :data-body="brotherhoodsData"
    :object-router="singleBrotherhoodProps"
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
  import FormBrotherhood from "../components/FormBrotherhood";
  import SpinnerLoader from "../components/SpinnerLoader";
  import CreateButton from "../components/CreateButton";

  const brotherhoodsProps = ref([]);
  const brotherhoodsData = ref([]);
  const dialogVisible = ref(false);
  const titleModal = ref('');
  const component = ref(0);
  const editData = ref(undefined);

  const singleBrotherhoodProps = ref({ name: 'Brotherhood', params: { brotherhood: '' }});

  onBeforeMount(async () => {
    await fetchBrotherhoodsElements();
  })

  const createNew = () => {
    titleModal.value = "Crear Cofradía";
    dialogVisible.value = true;
  }

  const updateData = (record) => {
    titleModal.value = "Editar Cofradía";
    editData.value = record.nick;
    dialogVisible.value = true;
  }

  const updateVisible = (value) => {
    dialogVisible.value = value;
  }

  const reloadData = async () => {
    await fetchBrotherhoodsElements();
    component.value++;
  }

  const fetchBrotherhoodsElements = async () =>{
    const brotherhoods = await APIHandler.get('brotherhood').then(response => response.json());

    if(brotherhoods){
      brotherhoodsData.value = brotherhoods;
      brotherhoodsProps.value = Object.keys(brotherhoods[0]);
    }
  }

</script>

<style scoped>

</style>