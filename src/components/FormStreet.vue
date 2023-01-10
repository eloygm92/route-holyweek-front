<template>
  <el-form
    v-if="optionsTypeStreet.length>0 && render"
    :model="formData"
    label-position="top"
    ref="form"
  >
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item
          value="name"
          label="Tipo calle"
        >
          <el-select
            v-model="formData.type"
            placeholder="Elige un tipo de calle"
          >
            <el-option
              v-for="item in optionsTypeStreet"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          value="name"
          label="Nombre calle"
        >
          <el-input
            v-model="formData.name"
            placeholder="Nombre de la calle"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="24">
        <el-form-item
          value="geoJson"
          label="GeoJSON"
        >
          <el-input
            type="textarea"
            v-model="formData.geoJson"
            placeholder="Introduzca el geoJson"
            :rows="10"
            clearable
          />
        </el-form-item>
        <el-descriptions>
          <el-descriptions-item>
            Calcule el geoJson
            <el-link
              href="https://geojson.io/#map=15/36.7189/-4.4258"
              target="_blank"
              type="primary"
            >
              aqui
            </el-link>
          </el-descriptions-item>
        </el-descriptions>
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
    class="flex justify-center items-center -mt-10"
  >
    <SpinnerLoader />
  </div>
</template>

<script setup>

  import {onBeforeMount, reactive, ref} from "vue";
  import * as APIHandler from "../lib/APIHandler";
  import SpinnerLoader from "../components/SpinnerLoader";
  import ButtonsForm from "../components/ButtonsForm";
  import _ from "lodash";

  const emit = defineEmits(['update:dialogVisible','reload']);

  const props = defineProps({
    editData: {
      type: String,
      default: undefined
    }
  });

  const optionsTypeStreet = ref([]);
  const form = ref(null);
  const render = ref(false);
  const formData = reactive({
    type: undefined,
    name: undefined,
    geoJson: undefined,
  });

  onBeforeMount(async () => {
    if(!_.isEmpty(props.editData)){
      let data = await APIHandler.get('streets/'+props.editData).then(response => response.json());
      if(data) {
        formData.type = data.type;
        formData.name = data.name;
        formData.geoJson = JSON.stringify(data.geoJson);
      }
    }

    let response = await APIHandler.get('streets/types').then(response => response.json());
    if(response) {
      optionsTypeStreet.value = response;
    }
    render.value=true;
  })

  const sendCreate = async () => {
    if(formData.type && formData.name && formData.geoJson) {

      await APIHandler.post('streets', {type: formData.type, name: formData.name, geoJson: JSON.parse(formData.geoJson)}).then(response => {
        if(response.status === 201) {
          emit('update:dialogVisible',false)
          emit('reload',true);
          resetForm();
        } else {
          if(typeof formData.geoJson === 'object')
            formData.geoJson = JSON.stringify(formData.geoJson);
        }
      })
    }
  }

  const resetForm = () => {
    formData.type = undefined;
    formData.name = undefined;
    formData.geoJson = undefined;
  }

</script>

<style scoped>

</style>