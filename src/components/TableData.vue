<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <el-table :data="props.data_body"  class="flex">
          <el-table-column v-for="column in props.data_header" :key="column" :prop="column" :label="column" />
          <el-table-column label="Actions">
            <template #default="scope">
              <el-button size="small" type="primary" @click="read(scope.row)">Read</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-main>
  </el-container>
</template>

<script setup>
  import {useRouter} from "vue-router";

  const router = useRouter();

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
    route.params[route.name] = row.name
    //{ name: 'street', params: { street_id: row.id }
    router.push(route)
  }

</script>

<style scoped>
</style>