<template>
  <div>
    <nav class="fixed w-full p-6 bg-transparent">
      <div class="flex items-center justify-between">
        <img src="~/assets/icon.svg" class="w-12 h-12" />
        <!-- Mobile toggle -->
        <div class="md:hidden">
          <button @click="drawer">
            <va-icon name="menu" />
          </button>
        </div>
        <va-icon name="menu" class="md:hidden" />
        <div class="hidden md:block">
          <ul class="flex space-x-8 text-sm font-mono">
            <!-- <li class="p-3" :class="isLogged ? 'hidden' : currentRouteName==='login' ? ' text-orange-500' : 'text-gray-800'">Blog</li> -->
            <li class="p-3 rounded-sm cursor-pointer bg-transparent transition ease-in-out hover:font-bold delay-[50ms] hover:-translate-y-1 hover:scale-110 duration-300" :class="isLogged ? 'hidden' : currentRouteName==='login' ? ' text-orange-500' : 'text-gray-800'" @click="navigateTo('/login')">Iniciar sesión</li>
            <li class="p-3 rounded-sm cursor-pointer bg-transparent transition ease-in-out hover:font-bold delay-[50ms] hover:-translate-y-1 hover:scale-110 duration-300" :class="isLogged ? 'hidden' : currentRouteName==='sign-up' ? ' text-orange-500' : 'text-gray-800'" @click="navigateTo('/sign-up')">Registrarse</li>
            <li class="p-3 rounded-sm cursor-pointer bg-transparent transition ease-in-out hover:font-bold delay-[50ms] hover:-translate-y-1 hover:scale-110 duration-300" :class="isLogged ? 'hidden' : currentRouteName==='dashboard' ? ' text-orange-500' : 'text-gray-800'" @click="navigateTo('/dashboard')">Dashboard</li>
            
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
    methods:{
    },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>
<style lang=""></style>
