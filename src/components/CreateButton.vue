<template>
  <el-row>
    <el-col>
      <el-button @click="$emit('click')" type="info" plain><font-awesome-icon icon="plus" class="fa-3xs" /><span class="ml-1 pt-0.5">Create</span></el-button>
    </el-col>
  </el-row>
</template>

<script setup>

</script>

<style scoped>
  button {
    background-color: #1f1f1fff;
  }
</style>