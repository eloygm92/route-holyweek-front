<template>
  <el-form
    :model="formData"
    v-if="optionsProcessionDay.length>0 && render"
    label-position="top"
    ref="form"
  >
    <el-row :gutter="24">
      <el-col :span="8">
        <el-form-item
          value="foundation"
          label="Dia de Procesion"
        >
          <el-select
            v-model="formData.procession_day"
            placeholder="Elige un día de Procesión"
          >
            <el-option
              v-for="item of optionsProcessionDay"
              :key="item.value"
              :label="translate_day(item.value)"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          value="nick"
          label="Nombre Coloquial"
        >
          <el-input
            v-model="formData.nick"
            placeholder="Apodo"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item
          value="foundation"
          label="Año de Fundación"
        >
          <el-input
            v-model="formData.foundation"
            placeholder="Año de la fundación de la cofradía"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-form-item
          value="name"
          label="Nombre completo Cofradía"
        >
          <el-input
            type="textarea"
            v-model="formData.name"
            :rows="10"
            placeholder="Real Cofradía de Nuestro Padre Jesús....."
            clearable
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-divider />
    <ButtonsForm
      @reset="resetForm"
      @create="sendCreate"
    />
  </el-form>
  <div
    v-else
    class="flex justify-center items-center mt-10"
  >
    <SpinnerLoader />
  </div>
</template>

<script setup>

  import {onBeforeMount, reactive, ref} from "vue";
  import _ from "lodash";
  import * as APIHandler from "../lib/APIHandler";
  import translate_day from "../lib/TranslateDay";
  import SpinnerLoader from "../components/SpinnerLoader";
  import ButtonsForm from "../components/ButtonsForm";

  const emit = defineEmits(['update:dialogVisible','reload']);

  const props = defineProps({
    editData: {
      type: String,
      default: undefined
    }
  });

  const optionsProcessionDay = ref([]);
  const form = ref(null);
  const render = ref(false);
  const formData = reactive({
    nick: undefined,
    name: undefined,
    foundation: undefined,
    procession_day: undefined,
  });

  onBeforeMount(async () => {

    if(!_.isEmpty(props.editData)) {
      let data = await APIHandler.get('brotherhood/'+props.editData).then(response => response.json());
      if(data) {
        formData.nick = data.nick;
        formData.name = data.name;
        formData.foundation = data.foundation;
        formData.procession_day = data.procession_day;
      }
    }

    let response = await APIHandler.get('brotherhood/procession_days').then(response => response.json());
    if(response) {
      optionsProcessionDay.value = response;
    }
    render.value = true;
  })

  const sendCreate = async () => {
    if(formData.nick && formData.name && formData.foundation && formData.procession_day ) {
      formData.foundation = parseInt(formData.foundation)
      if(_.isEmpty(props.editData)) {
        await APIHandler.post('brotherhood', formData).then(response => {
          if (response.status === 201) {
            emit('update:dialogVisible', false)
            emit('reload', true);
            resetForm();
          }
        });
      } else {
        await APIHandler.patch('brotherhood/'+props.editData, formData).then(response => {
          if (response.status === 201) {
            emit('update:dialogVisible', false)
            emit('reload', true);
            resetForm();
          }
        });
      }
    }
  }

  const resetForm = () => {
    formData.nick = undefined;
    formData.name = undefined;
    formData.foundation = undefined;
    formData.procession_day = undefined;
  }

</script>

<style scoped>

</style>