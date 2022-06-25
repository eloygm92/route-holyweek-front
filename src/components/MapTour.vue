<template>
  <l-map
    v-model:zoom="zoom"
    style="height: 50vh"
    :center="coordinates[0][0]"
  >
    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
    <l-polygon
      :lat-lngs="coordinates"
      color="#41b782"
      :fill="true"
      :fillOpacity="0.5"
      fillColor="#41b782"
    />
  </l-map>
</template>

<script setup>

  import "leaflet/dist/leaflet.css"
  import { LMap, LTileLayer,LPolygon } from "@vue-leaflet/vue-leaflet";
  import {ref} from "vue";

  const props = defineProps({
    coordinates: {
      type: Array,
      required: true
    },
  });

  const zoom = ref(16);

</script>

<style scoped>

</style>