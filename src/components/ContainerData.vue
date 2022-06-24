<template>
  <header v-if="route.name!=='Login'">
    <NavbarComponent />
  </header>
  <main>
    <slot></slot>
  </main>
</template>

<script setup>
import NavbarComponent from "./NavbarComponent";
import { useRoute } from "vue-router";

const route = useRoute();

</script>

<style scoped>

</style>