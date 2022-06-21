<template>
  <el-form :model="formData" label-position="top" ref="form" v-if="streetList.length>0">
    <el-row :gutter="24">
      <el-col :span="24">
        <el-form-item value="year" label="Año">
          <el-input-number v-model="formData.year" :min="2018" :max="yearMax" :step="1" placeholder="Semana santa año..." style="width: 100%"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item value="start" label="Salida">
          <el-time-picker v-model="formData.start" placeholder="Hora de salida" format="HH:mm"/>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item value="end" label="Encierro">
          <el-time-picker v-model="formData.end" placeholder="Hora de encierro" format="HH:mm"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="8">
        <el-form-item value="tribune" label="Tribuna">
          <el-time-picker v-model="formData.tribune" placeholder="Paso por Tribuna" format="HH:mm"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item value="grove" label="Alameda">
          <el-time-picker v-model="formData.grove" placeholder="Paso por Alameda" format="HH:mm"/>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item value="cathedral" label="Torre Sur Catedral">
          <el-time-picker v-model="formData.cathedral" placeholder="Paso por Torre Sur de la Catedral" format="HH:mm"/>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24">
        <div class="flex justify-center">
          <el-form-item value="streets" label="Calles">
            <el-transfer
              v-model="formData.streets"
              :titles="['Por Añadir', 'Añadidas']"
              :data="streetList"
              target-order="push"
            >
              <template #default="{ option }">
                <span>{{ option.label }}</span>
              </template>
            </el-transfer>
          </el-form-item>
        </div>
      </el-col>
    </el-row>
    <el-divider />
    <ButtonsForm
      @reset="resetForm"
      @create="sendCreate"
    />
  </el-form>
  <div v-else class="flex justify-center mt-10">
    <SpinnerLoader/>
  </div>
</template>

<script setup>

  import {onBeforeMount, reactive, ref} from "vue";
  import dayjs from "dayjs";
  import * as APIHandler from "../lib/APIHandler";
  import ButtonsForm from "./ButtonsForm";
  import SpinnerLoader from "../components/SpinnerLoader";

  const emit = defineEmits([''])

  const props = defineProps({
    brotherhood_id: {
      type: String,
      required: true
    }
  })

  const yearMax = ref(0);
  const streetList = ref([]);
  const form = ref(null);
  const formData = reactive({
    year: undefined,
    streets: [],
    start: undefined,
    tribune: undefined,
    grove: undefined,
    cathedral: undefined,
    end: undefined,
    brotherhood: props.brotherhood_id,
  });

  yearMax.value = dayjs().isBefore(dayjs('30-09','DD-MM'),'day') ? dayjs().year() : dayjs().year() + 1;

  onBeforeMount(async () => {
    const dataStreet = await APIHandler.get('streets/tags').then(response => response.json());
    if(dataStreet) {
      streetList.value = dataStreet;
    }

  })

  const sendCreate = async () => {
    const data = await APIHandler.post('tour', formData)

    if(data.status === 200) {
      resetForm();
      formData.streets = [];
      formData.year = undefined;
      emit('reload');
    }
  }

  const resetForm = () => {
    formData.start = undefined;
    formData.end = undefined;
    formData.year = undefined;
    formData.streets = [];
    formData.tribune = undefined;
    formData.grove = undefined;
    formData.cathedral = undefined;
  }

</script>

<style scoped>

</style>