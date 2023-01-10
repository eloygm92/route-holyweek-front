<template>
  <div v-if="streetData.length > 0 && coordinates.length > 0 && !loading">
    <el-row :gutter="24">
      <el-col
        :span="4"
        :offset="2"
      >
        <h3>
          <font-awesome-icon :icon="['far','clock']" />
          <span class="font-bold ml-1">
            Salida
          </span>
        </h3>
        <span>
          {{ transform_hour(tour.start) }}
        </span>
      </el-col>
      <el-col :span="4">
        <h3>
          <font-awesome-icon :icon="['far','clock']" />
          <span class="font-bold ml-1">
            Tribuna
          </span>
        </h3>
        <span>
          {{ transform_hour(tour.tribune) }}
        </span>
      </el-col>
      <el-col :span="4">
        <h3>
          <font-awesome-icon :icon="['far','clock']" />
          <span class="font-bold ml-1">
            Alameda
          </span>
        </h3>
        <span>
          {{ transform_hour(tour.grove) }}
        </span>
      </el-col>
      <el-col :span="4">
        <h3>
          <font-awesome-icon :icon="['far','clock']" />
          <span class="font-bold ml-1">
            Catedral
          </span>
        </h3>
        <span>
          {{ transform_hour(tour.cathedral) }}
        </span>
      </el-col>
      <el-col :span="4">
        <h3>
          <font-awesome-icon :icon="['far','clock']" />
          <span class="font-bold ml-1">
            Encierro
          </span>
        </h3>
        <span>
          {{ transform_hour(tour.end) }}
        </span>
      </el-col>
    </el-row>
    <el-row class="mt-2">
      <el-col :span="6">
        <h3 class="font-bold">
          Calle
        </h3>
        <span>
          {{ streetData.join(', ') }}
        </span>
      </el-col>
    </el-row>
    <el-row class="mt-2">
      <h3 class="font-bold mb-2">
        Recorrido sobre el mapa
      </h3>
      <MapTour :coordinates="coordinates" />
    </el-row>
  </div>
</template>

<script setup>

  import {onBeforeMount, ref} from "vue";
  import MapTour from "../components/MapTour";
  import dayjs from "dayjs";

  const props = defineProps({
    tour: {
      type: Object,
      required: true
    }
  })

  const streetData = ref([]);
  const coordinates = ref([]);
  const loading = ref(true);


  onBeforeMount(async () => {
    loading.value = true;
    for (const street of props.tour.streets) {
      streetData.value.push(street.type + ' ' + street.name);
      coordinates.value.push(await street.geoJson.geometry.coordinates[0].map(coor => {
        return coor[0].toString().includes('-4') ? coor.reverse() : coor;
      }));
    }
    loading.value= false;
  });

  const transform_hour = (time) => {
    return dayjs(time).format('HH:mm');
  }
</script>

<style scoped>

</style>