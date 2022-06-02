<template>
  <TableData
    v-if="brotherhoodsProps.length>0 && brotherhoodsData.length>0"
    :data_header="brotherhoodsProps"
    :data_body="brotherhoodsData"
    :object_router="singleBrotherhoodProps"
  />
</template>

<script setup>

  import TableData from "../components/TableData";
  import {onBeforeMount, ref} from "vue";
  import * as APIHandler from "../lib/APIHandler";

  const brotherhoodsProps = ref([]);
  const brotherhoodsData = ref([]);

  const singleBrotherhoodProps = ref({ name: 'Brotherhood', params: { Brotherhood: '' }});

  onBeforeMount(async () => {
    const brotherhoods = await APIHandler.get('brotherhood').then(response => response.json());

    if(brotherhoods){
      brotherhoodsData.value = brotherhoods;
      brotherhoodsProps.value = Object.keys(brotherhoods[0]);
    }
  })

</script>

<style scoped>

</style>