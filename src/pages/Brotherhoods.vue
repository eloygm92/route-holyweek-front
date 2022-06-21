<template>
  <Modal
    v-if="dialogVisible"
    :dialog-visible="dialogVisible"
    :title="titleModal"
    @update:dialogVisible="updateVisible"
  >
    <FormBrotherhood
      @update:dialogVisible="updateVisible"
      @reload="reloadData"
    />
  </Modal>
  <TableData
    v-if="brotherhoodsProps.length>0 && brotherhoodsData.length>0"
    :data_header="brotherhoodsProps"
    :data_body="brotherhoodsData"
    :object_router="singleBrotherhoodProps"
    :key="component"
  >
    <CreateButton @click="createNew" />
  </TableData>
  <div v-else class="flex justify-center mt-10">
    <SpinnerLoader/>
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

  const singleBrotherhoodProps = ref({ name: 'Brotherhood', params: { Brotherhood: '' }});

  onBeforeMount(async () => {
    fetchBrotherhoodsElements();
  })

  const createNew = () => {
    titleModal.value = "Crear Cofradía";
    dialogVisible.value = true;
  }

  const updateVisible = (value) => {
    dialogVisible.value = value;
  }

  const reloadData = () => {
    fetchBrotherhoodsElements();
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