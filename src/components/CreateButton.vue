<template>
  <el-row>
    <el-col :span="1" :offset="20" class="pl-6">
      <button @click="$emit('click')" class="border-2 px-1.5 pt-0.5"><font-awesome-icon icon="plus" /></button>
    </el-col>
  </el-row>
</template>

<script setup>
  const emit = defineEmits(['click']);
</script>

<style scoped>

</style>