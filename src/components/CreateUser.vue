<template>
  <el-form
    :model="formData"
    label-position="top"
    ref="form"
    v-if="render"
  >
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item
          value="email"
          label="Correo electronico"
        >
          <el-input
            v-model="formData.email"
            type="email"
            placeholder="Introduzca un correo electronico"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          value="role"
          label="Rol"
        >
          <el-select
            v-model="formData.role"
            placeholder="Selecciona un rol"
            style="width: 100%"
          >
            <el-option
              v-for="item in optionsRole"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item
          value="username"
          label="Nombre de usuario"
        >
          <el-input
            v-model="formData.username"
            placeholder="Introduzca un nombre de usuario"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          value="password"
          label="Contraseña"
        >
          <el-input
            v-model="formData.password"
            type="password"
            placeholder="Introduzca una contraseña"
            :show-password="true"
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
    class="flex justify-center items-center -mt-10"
  >
    <SpinnerLoader />
  </div>
</template>

<script setup>

  import {onBeforeMount, reactive, ref} from "vue";
  import * as APIHandler from "../lib/APIHandler";
  import ButtonsForm from "./ButtonsForm";
  import _ from "lodash";
  import SpinnerLoader from "../components/SpinnerLoader";

  const emit = defineEmits(['reload','update:dialogVisible']);

  const props = defineProps({
    editData: {
      type: String,
      default: undefined
    }
  });

  const form = ref(null);
  const optionsRole = ref([]);
  const render = ref(false);
  const formData = reactive({
    username: undefined,
    email: undefined,
    password: undefined,
    role: undefined,
  })

  onBeforeMount(async () => {

    if(!_.isEmpty(props.editData)) {
      const data = await APIHandler.get('users/'+props.editData).then(response => response.json());
      if(data) {
        formData.username = data.username;
        formData.email = data.email;
        formData.password = data.password;
        formData.role = data.role;
      }
    }

    const dataRole = await APIHandler.get('users/roles').then(response => response.json());
    if(dataRole) {
      for(const role of dataRole){
        let roleLabel = {
          value: role._id,
          label: role.name,
        }
        optionsRole.value.push(roleLabel);
      }
    }
    render.value=true;
  })

  const sendCreate = async () => {
    const data = await APIHandler.post('users', formData)

    if(data.status === 200 || data.status === 201) {
      resetForm();
      emit('update:dialogVisible',false);
      emit('reload');
    }
  }

  const resetForm = () => {
    formData.username = undefined;
    formData.email = undefined;
    formData.password = undefined;
    formData.role = undefined;
  }

</script>

<style scoped>

</style>