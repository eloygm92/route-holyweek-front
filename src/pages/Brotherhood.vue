<template>
  <el-container v-if="brotherhoodData.name">
    <el-aside class="pt-5 pl-4">
      <el-card class="box-card">
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
        <div class="pb-3">
          <h3 class="font-extrabold">Dia de Procesión</h3>
          <p>{{ translate_day(brotherhoodData.procession_day) }}</p>
        </div>
      </el-card>
    </el-aside>
    <el-main>
      <el-card class="box-card">

      </el-card>
    </el-main>
  </el-container>
</template>

<script setup>

  import {onBeforeMount,ref} from "vue";
  import * as APIHandler from "../lib/APIHandler"
  import translate_day from "../lib/Translate_day";

  const brotherhoodData = ref({});

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
  })
</script>

<style scoped>

</style>