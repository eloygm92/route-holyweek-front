<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <slot />
        <el-table
          :data="tableData"
          class="flex"
        >
          <el-table-column
            v-for="column in props.dataHeader"
            :key="column"
            :prop="column"
            :label="translate_header(column)"
          />
          <el-table-column label="Acciones">
            <template #default="scope">
              <el-dropdown trigger="click">
                <el-button
                  size="small"
                  type="info"
                  plain
                >
                  <font-awesome-icon
                    icon="ellipsis-vertical"
                    class="fa-3xs"
                  />
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item v-if="routename.path !== '/users'">
                      <el-button
                        size="small"
                        type="info"
                        @click="read(scope.row)"
                        plain
                      >
                        <font-awesome-icon
                          icon="info"
                          class="fa-3xs pl-1.5"
                        />
                        <span class="ml-1 pr-1.5 pt-0.5">
                          Detalles
                        </span>
                      </el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <el-button
                        size="small"
                        type="info"
                        @click="$emit('update',scope.row)"
                        plain
                      >
                        <font-awesome-icon
                          icon="pen"
                          class="-mx-1 fa-3xs"
                        />
                        <span class="ml-2 pt-0.5">
                          Actualizar
                        </span>
                      </el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-main>
  </el-container>
</template>

<script setup>

  import {ref} from "vue";
  import {useRoute, useRouter} from "vue-router";
  import translate_content from "../lib/TranslateContent";
  import translate_header from "../lib/TranslateHeaders";

  defineEmits(['update']);

  const router = useRouter();
  const routename = useRoute();
  const tableData = ref([]);

  const props = defineProps({
    dataHeader: {
      type: Array,
      required: true
    },
    dataBody: {
      type: Array,
      required: true
    },
    objectRouter: {
      type: Object,
      required: true
    }
  })

  const translate_rows = () => {
    for(const row of props.dataBody) {
      // eslint-disable-next-line no-unused-vars
      Object.keys(row).map((key,index) => {
        row[key] = translate_content(row[key]);
      })
      tableData.value.push(row);
    }
  }

  translate_rows();

  const read = (row) => {
    let route = props.objectRouter

    route.params[route.name.toLowerCase()] = routename.path==='/brotherhoods' ? row.nick : row.name;
    //{ name: 'street', params: { street_id: row.id }
    router.push(route)
  }

</script>

<style scoped>
</style>