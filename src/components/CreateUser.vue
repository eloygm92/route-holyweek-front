<template>
  <el-form :model="formData" label-position="top" ref="form">
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form-item value="email" label="Correo electronico">
          <el-input v-model="formData.email" type="email" placeholder="Introduzca un correo electronico" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item value="role" label="Rol">
          <el-select v-model="formData.role" placeholder="Selecciona un rol" style="width: 100%">
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
        <el-form-item value="username" label="Nombre de usuario">
          <el-input v-model="formData.username" placeholder="Introduzca un nombre de usuario" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item value="password" label="Contraseña">
          <el-input v-model="formData.password" type="password" placeholder="Introduzca una contraseña" :show-password="true" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-divider />
    <ButtonsForm
      @reset="resetForm"
      @create="sendCreate"
    />
  </el-form>
</template>

<script setup>

  import {onBeforeMount, reactive, ref} from "vue";
  import * as APIHandler from "../lib/APIHandler";
  import ButtonsForm from "./ButtonsForm";

  const emit = defineEmits(['reload','update:dialogVisible']);

  const form = ref(null);
  const optionsRole = ref([]);
  const formData = reactive({
    username: undefined,
    email: undefined,
    password: undefined,
    role: undefined,
  })

  onBeforeMount(async () => {
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