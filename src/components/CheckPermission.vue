<template>

</template>

<script setup>
  import { useRouter } from 'vue-router';
  import { useCookies } from "vue3-cookies";

  const { cookies } = useCookies();
  let token = undefined;


  token = cookies.get('jwt_token');

  const router = useRouter();

  if(!token){
    router.replace('/login');
  }
  
</script>

<style scoped>

</style>