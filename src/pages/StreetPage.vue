<template>
  <el-container v-if="streetData.name">
    <el-aside class="pt-5 pl-4">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>Detalles de la Calle</span>
          </div>
        </template>
        <div class="card-body">
          <el-form-item
            label="Tipo de via"
            class="my-3"
          >
            <el-input
              v-model="streetData.type"
              disabled
            />
          </el-form-item>
          <el-form-item
            label="Nombre"
            class="my-3"
          >
            <el-input
              v-model="streetData.name"
              disabled
            />
          </el-form-item>
          <el-form-item
            label="GeoJSON"
            class="my-3"
          >
            <el-input
              autosize
              type="textarea"
              v-model="geoJson"
              disabled
            />
          </el-form-item>
        </div>
      </el-card>
    </el-aside>
    <el-main>
      <el-card
        class="box-card py-10"
      >
        <MapStreet
          :map-data="JSON.parse(geoJson)"
        />
      </el-card>
    </el-main>
  </el-container>
</template>

<script setup>

  import {onBeforeMount, ref} from "vue";
  import * as APIHandler from "../lib/APIHandler";
  import MapStreet from "../components/MapStreet";

  const streetData = ref({});
  const geoJson = ref({});

  const props = defineProps({
    street: {
      type: String,
      required: true
    },
  })

  onBeforeMount(async () => {
    const street = await APIHandler.get('streets/' + props.street).then(response => response.json());
    if(street) {
      geoJson.value = JSON.stringify(street.geoJson)
      streetData.value = street;
    }
  })

</script>

<style scoped>

</style>