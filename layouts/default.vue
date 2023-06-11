<template>
  <div>
    <nav class="fixed w-full p-6 bg-transparent z-40">
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
            <li
              class="p-3 rounded-md cursor-pointer text-secondary bg-transparent transition ease-in-out hover:font-bold hover:bg-primary hover:text-white delay-[100ms] hover:-translate-y-1 hover:scale-110 duration-150"
              :class="
                !isLogged
                  ? 'hidden'
                  : ''
              "
              @click="signOut"
            >
              Cerrar sesión
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
                !isLogged
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
            <li
              class="p-3 rounded-md cursor-pointer text-secondary bg-transparent transition ease-in-out hover:font-bold hover:bg-primary hover:text-white delay-[100ms] hover:-translate-y-1 hover:scale-110 duration-150"
              :class="
                isLogged
                  ? 'hidden'
                  : 'text-gray-800'
              "
              @click="signOut"
            >
              Cerrar sesión
            </li>
          </ul>
          <a class="md:hidden cursor-pointer transparent m-0 p-0 h-full" :class="isOpen ? 'block w-1/3' : 'hidden'" @click="isOpen = !isOpen"></a>
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
      isLogged: false,
    };
  },
  setup() {
    //SUPABASE CLIENT
    const user = useSupabaseUser();
    const client = useSupabaseClient();
    const loading = useLoading();
    return {
      client,
      user,
      loading
    };
  },
  methods: {
    async signOut() {
        try {
          this.loading = true;
          let { error } = await this.client.auth.signOut();
          if(error){
            this.$vaToast.init({color:"danger", message: error.message,  duration: 5000})
          }else{
            navigateTo("/login")
          }
        } catch (error) {
          alert(error.message);
        } finally {
          this.loading = false;
        }
      },
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  onMounted(){
    watchEffect(()=>{
      if(this.user.value){
        this.isLogged = true;
      }else{
        this.isLogged = false;
      }
    })
  }
};
</script>
