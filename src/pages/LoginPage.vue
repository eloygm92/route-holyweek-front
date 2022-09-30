<template>
  <div class="h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-red-700 to-purple-800">
    <div class="max-w-full mx-auto">
      <div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-md p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form
          class="space-y-6"
          @submit.prevent
        >
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">
            Sign in to our platform
          </h3>
          <div>
            <label
              for="username"
              class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Introduce tu nombre de usuario
            </label>
            <input
              type="username"
              name="username"
              v-model="username"
              id="username"
              placeholder="usuario"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required=""
            >
          </div>
          <div>
            <label
              for="password"
              class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              v-model="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required=""
            >
          </div>
          <div class="flex items-start">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  class="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                >
              </div>
              <div class="text-sm ml-3">
                <label
                  for="remember"
                  class="font-medium text-gray-900 dark:text-gray-300"
                >
                  Recuerdame
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            @click="loginButton()"
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Inicia Sesion
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useCookies } from 'vue3-cookies'
  import { useRouter } from 'vue-router'

  const { cookies } = useCookies();
  const router = useRouter();


  let password = ref('');
  let username = ref('');

  let loginButton = () => {
    // TODO comportamiento de boton para login

    fetch(import.meta.env.VITE_API_URL + 'auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })
      .then(response => {
        if (response.status === 201) return response.json()
      })
      .then(data => {
          cookies.set('jwt_token', data.access_token, "12h");
        }
      ).finally(() => {
        if(cookies.get('jwt_token')) {
          router.push({ name: "Dashboard"});
        }
    })
  }

</script>

<style scoped>

</style>