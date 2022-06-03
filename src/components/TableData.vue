<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <slot></slot>
        <el-table :data="props.data_body"  class="flex">
          <el-table-column v-for="column in props.data_header" :key="column" :prop="column" :label="translate_header(column)" />
          <el-table-column label="Acciones">
            <template #default="scope">
              <el-button size="small" type="primary" @click="read(scope.row)">Detalle</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-card>
    </el-main>
  </el-container>
</template>

<script setup>
  import {useRoute, useRouter} from "vue-router";
  import translate_day from "../lib/Translate_day";
  import translate_header from "../lib/TranslateHeaders";

  const router = useRouter();
  const routename = useRoute();

  const props = defineProps({
    data_header: {
      type: Array,
      required: true
    },
    data_body: {
      type: Array,
      required: true
    },
    object_router: {
      type: Object,
      required: true
    }
  })

  const read = (row) => {
    let route = props.object_router

    route.params[route.name] = routename.path==='/brotherhoods' ? row.nick : row.name;
    //{ name: 'street', params: { street_id: row.id }
    router.push(route)
  }

</script>

<style scoped>
</style>