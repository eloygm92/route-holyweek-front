<template>
  <TableData
      v-if="streetsProps.length>0 && streetsData.length>0"
      :data_header="streetsProps"
      :data_body="streetsData"
      :object_router="singleStreetProps" />
</template>

<script setup>

  import TableData from "../components/TableData";
  import {onBeforeMount, ref} from "vue";
  import * as APIHandler from "../lib/APIHandler";

  const streetsProps = ref([]);
  const streetsData = ref([]);

  const singleStreetProps = ref({ name: 'Street', params: { Street: '' }});

  onBeforeMount(async () => {
    let streets = await APIHandler.get('streets').then(response => response.json());
    if(streets) {
      streetsData.value = streets;
      streetsProps.value = Object.keys(streets[0]);
    }
  })


</script>

<style scoped>

</style>