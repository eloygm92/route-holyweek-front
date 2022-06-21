<template>
  <Modal
    v-if="new_tour_modal"
    :dialog-visible="new_tour_modal"
    title="Crear nuevo Recorrido"
    @update:dialogVisible="updateVisible"
  >
    <CreateTour :brotherhood_id="brotherhoodData['_id']" @reload="reloadData"/>
  </Modal>
  <el-container v-if="brotherhoodData.name" key="">
    <el-aside class="pt-5 pl-4">
      <el-card class="box-card">
        <div class="pb-3">
          <h3 class="font-extrabold">Dia de Procesión</h3>
          <p>{{ translate_day(brotherhoodData.procession_day) }}</p>
        </div>
        <div class="pb-3">
          <h3 class="font-extrabold">Apodo</h3>
          <p>{{ brotherhoodData.nick }}</p>
        </div>
        <div class="pb-3">
          <h3 class="font-extrabold">Cofradía</h3>
          <p>{{ brotherhoodData.name }}</p>
        </div>
        <div class="pb-3">
          <h3 class="font-extrabold">Fundación</h3>
          <p class="text-justify">{{ brotherhoodData.foundation }}</p>
        </div>
      </el-card>
    </el-aside>
    <el-main>
      <el-card class="box-card" v-if="!loading">
        <div v-if="!_.isEmpty(toursData)" class="card-body">
          <el-tabs type="border-card">
            <el-tab-pane v-for="tour in toursData" :label="tour.year.toString()">{{ JSON.stringify(tour)}}</el-tab-pane>
          </el-tabs>
        </div>
        <div v-else class="text-center">
          <h3>No hay ningun recorrido disponible. ¿Desea <el-link type="primary" @click="openModal">añadir</el-link> uno?</h3>
        </div>
      </el-card>
      <div class="flex justify-center mt-10" v-else>
        <SpinnerLoader/>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>

  import {onBeforeMount,ref} from "vue";
  import * as APIHandler from "../lib/APIHandler"
  import translate_day from "../lib/TranslateDay";
  import SpinnerLoader from "../components/SpinnerLoader";
  import _ from "lodash";
  import CreateTour from "../components/CreateTour";
  import Modal from "../components/Modal";


  const brotherhoodData = ref({});
  const toursData = ref([]);
  const loading = ref(true);
  const new_tour_modal = ref(false);
  const componentReload= ref(0);

  const props = defineProps({
    Brotherhood: {
      type: String,
      required: true
    },
  })

  onBeforeMount(async () => {
    const brotherhood = await APIHandler.get('brotherhood/' + props.Brotherhood).then(response => response.json());

    if(brotherhood) {
      brotherhoodData.value = brotherhood;
    }

    await fetchTours();

    loading.value = false;
  })

  const openModal = () => {
    new_tour_modal.value = true;
  }

  const updateVisible = (value) => {
    new_tour_modal.value = value;
  }

  const reloadData = async () => {
    toursData.value = [];
    await fetchTours();
  }

  const fetchTours = async () => {
    const tours = await APIHandler.get('tour/' + props.Brotherhood).then(response => response.json());

    if(tours && !_.isEmpty(tours)) {
      toursData.value = tours;
    }
  }

</script>

<style scoped>

</style>