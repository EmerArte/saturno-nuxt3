<template>
  <div>
    <nav class="fixed w-full p-6 bg-transparent z-50">
      <div class="flex items-center justify-between">
        <img src="~/assets/icon.svg" class="w-12 h-12" />
        <!-- Mobile toggle -->
        <div class="md:hidden">
          <button @click="isOpen = !isOpen" >
            <va-icon name="menu" />
          </button>
        </div>
        <div class="hidden md:block">
          <ul class="flex space-x-8 text-sm font-mono">
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
        :class="isOpen ? 'translate-x-96 transition delay-150 duration-300 ease-in-out': '-translate-x-96 transition delay-150 duration-300 ease-in-out'"
          class="absolute top-0 -left-96 h-screen w-1/2 shadow-lg bg-white md:hidden" 
          id="mobile-menu"
        >
        <!--  -->
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              class="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900"
              >Inicio</a
            >
            <a
              href="#"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >Productos</a
            >
            <a
              href="#"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >Servicios</a
            >
            <a
              href="#"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >Contacto</a
            >
          </div>
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
