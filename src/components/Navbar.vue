<template>
    <nav class="flex justify-around py-4 bg-white/80 backdrop-blur-md shadow-md w-full fixed top-0 left-0 right-0 z-10">
      <div class="items-center hidden space-x-8 lg:flex">
        <router-link to="/dashboard" class="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300">
          Dashboard
        </router-link>
      </div>
      <div class="flex items-center space-x-5">
        <router-link to="/dashboard" class="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300">
          Profile
        </router-link>
        <button @click="logout()" class="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300">
          LogOut
        </button>
      </div>
    </nav>
</template>

<script setup>

  import {reactive, ref, watch} from "vue";
  import {useRouter} from "vue-router";
  import { useCookies } from 'vue3-cookies'

  const {cookies} = useCookies();
  const router = useRouter();

  let logoutTick = ref(false);

  let logout = () => {
    cookies.remove('jwt_token');
    logoutTick.value=true;
  }

  watch(() => logoutTick.value,() => {
    if (!cookies.get('jwt_token')) {
      router.push('/login');
    }
})

</script>

<style scoped>

</style>