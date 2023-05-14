<template>
  <div>
    <nav class="fixed w-full p-6 bg-transparent z-50">
      <div class="flex items-center justify-between">
        <img src="~/assets/logo.svg" class="h-12" />
        <!-- Mobile toggle -->
        <div class="md:hidden">
          <button @click="isOpen = !isOpen">
            <va-icon name="menu" />
          </button>
        </div>
        <div class="hidden md:block">
          <ul class="flex space-x-8 text-lg md:text-base font-mono">
            <!-- <li class="p-3" :class="isLogged ? 'hidden' : currentRouteName==='login' ? ' text-orange-500' : 'text-gray-800'">Blog</li> -->
            <li
              class="p-3 rounded-sm cursor-pointer bg-transparent transition ease-in-out hover:font-bold delay-[50ms] hover:-translate-y-1 hover:scale-110 duration-300"
              :class="
                isLogged
                  ? 'hidden'
                  : currentRouteName === 'login'
                  ? ' text-orange-500'
                  : 'text-gray-800'
              "
              @click="navigateTo('/login')"
            >
              Iniciar sesión
            </li>
            <li
              class="p-3 rounded-sm cursor-pointer bg-transparent transition ease-in-out hover:font-bold delay-[50ms] hover:-translate-y-1 hover:scale-110 duration-300"
              :class="
                isLogged
                  ? 'hidden'
                  : currentRouteName === 'sign-up'
                  ? ' text-orange-500'
                  : 'text-gray-800'
              "
              @click="navigateTo('/sign-up')"
            >
              Registrarse
            </li>
            <li
              class="p-3 rounded-sm cursor-pointer bg-transparent transition ease-in-out hover:font-bold delay-[50ms] hover:-translate-y-1 hover:scale-110 duration-300"
              :class="
                isLogged
                  ? 'hidden'
                  : currentRouteName === 'dashboard'
                  ? ' text-orange-500'
                  : 'text-gray-800'
              "
              @click="navigateTo('/dashboard')"
            >
              Dashboard
            </li>
          </ul>
        </div>
        <div
          :class="
            isOpen
              ? 'translate-x-96 transition delay-150 duration-300 ease-in-out'
              : '-translate-x-96 transition delay-150 duration-300 ease-in-out'
          "
          class="absolute top-0 -left-96 h-screen w-full bg-transparent md:hidden"
          id="mobile-menu"
        >
        <div class="flex flex-row w-full h-full">
          <ul
            class="flex flex-nowrap flex-col items-center w-2/3 h-full shadow-lg bg-white font-mono mg:text-md text-lg"
          >
            <li class="my-10">
              <a href="/" class="w-full">
                <img
                  src="~/assets/logo.svg"
                  class="h-12 mx-0"
                  title="main_logo"
                />
              </a>
            </li>

            <!-- <li class="p-3" :class="isLogged ? 'hidden' : currentRouteName==='login' ? ' text-orange-500' : 'text-gray-800'">Blog</li> -->
            <li
              class="p-3 rounded-sm cursor-pointer bg-transparent transition ease-in-out hover:font-bold delay-[50ms] hover:-translate-y-1 hover:scale-110 duration-300"
              :class="
                isLogged
                  ? 'hidden'
                  : currentRouteName === 'login'
                  ? ' text-orange-500'
                  : 'text-gray-800'
              "
              @click="navigateTo('/login')"
            >
              Iniciar sesión
            </li>
            <li
              class="p-3 rounded-sm cursor-pointer bg-transparent transition ease-in-out hover:font-bold delay-[50ms] hover:-translate-y-1 hover:scale-110 duration-300"
              :class="
                isLogged
                  ? 'hidden'
                  : currentRouteName === 'sign-up'
                  ? ' text-orange-500'
                  : 'text-gray-800'
              "
              @click="navigateTo('/sign-up')"
            >
              Registrarse
            </li>
            <li
              class="p-3 rounded-sm cursor-pointer bg-transparent transition ease-in-out hover:font-bold delay-[50ms] hover:-translate-y-1 hover:scale-110 duration-300"
              :class="
                isLogged
                  ? 'hidden'
                  : currentRouteName === 'dashboard'
                  ? ' text-orange-500'
                  : 'text-gray-800'
              "
              @click="navigateTo('/dashboard')"
            >
              Dashboard
            </li>
          </ul>
          <a class="block md:hidden w-1/3 cursor-pointer transparent m-0 p-0 h-full" @click="isOpen = !isOpen"></a>
        </div>
         
          <!--  -->
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  setup() {
    //SUPABASE CLIENT
    const client = useSupabaseClient();
    return {
      client,
    };
  },
  methods: {},
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>
<style lang=""></style>
