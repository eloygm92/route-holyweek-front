<template>
  <l-map
      v-model="zoom"
      style="height: 50vh"
      :center="mapData.geometry.coordinates[0][0]">
    <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
    <l-polygon
      :lat-lngs="coordinates"
      color="#41b782"
      :fill="true"
      :fillOpacity="0.5"
      fillColor="#41b782"/>
  </l-map>

</template>

<script setup>

  import "leaflet/dist/leaflet.css"
  import { LMap, LTileLayer,LPolygon } from "@vue-leaflet/vue-leaflet";
  import {onBeforeMount, ref} from "vue";

  const props = defineProps({
    mapData: {
      type: Object,
      required: true
    },
  });
  //console.log(props.mapData.geometry.coordinates);
  const zoom = ref(16);
  const coordinates = ref([]);

  onBeforeMount(async () => {
    for(const coor of props.mapData.geometry.coordinates[0]){
      coordinates.value.push(await coor.reverse());
    }
  });

</script>

<style scoped>
</style>