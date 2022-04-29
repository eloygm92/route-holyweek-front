<template>

</template>

<script setup>
  import { useRouter } from 'vue-router';

  let token = undefined;


  token = localStorage.getItem('jwt_token');

  const router = useRouter();

  if(token){
    router.replace('/dashboard');
  } else {
    router.replace('/login');
  }
  
</script>

<style scoped>

</style>