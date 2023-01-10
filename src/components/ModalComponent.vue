<template>
  <el-dialog
    v-model="dialogVisible"
    width="50%"
    destroy-on-close
    center
    @closed="closedModal"
    @update:dialog-visible="$emit('update:dialogVisible', $event)"
  >
    <slot />
  </el-dialog>
</template>

<script setup>

  defineProps({
    dialogVisible: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['update:dialogVisible'])

  const closedModal = () => {
    emit('update:dialogVisible',false)
  }

</script>

<style scoped>

</style>