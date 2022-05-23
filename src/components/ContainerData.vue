<template>
  <header v-if="route.name!=='Login'">
    <Navbar />
  </header>
  <main>
    <slot></slot>
  </main>
</template>

<script setup>
import Navbar from "./Navbar";
import { useRoute } from "vue-router";

const route = useRoute();

</script>

<style scoped>

</style>