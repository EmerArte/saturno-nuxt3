<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div class="w-[80%] md:w-[42%] flex flex-col items-center justify-evenly">
      <h2
        class="text-center text-xl md:text-2xl uppercase font-extrabold font-mono my-3 w-full"
      >
        Iniciar sesión
      </h2>
      <va-card-content class="w-[80%]">
        <va-form ref="form" @validation="validation = $event">
          <div class="flex flex-col space-y-5">
            <va-input
              v-model="emailInput"
              label="Email"
              type="email"
              :rules="emailRules"
            />
            <va-input
              v-model="passwordInput"
              :type="isPasswordVisible ? 'text' : 'password'"
              :max-length="18"
              :rules="passwordValidation"
              label="Contraseña"
            >
              <template #appendInner>
                <va-icon
                  :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
                  size="small"
                  @click="isPasswordVisible = !isPasswordVisible"
                />
              </template>
            </va-input>
          </div>
        </va-form>
      </va-card-content>
      <va-card-actions align="between" class="w-[80%]">
        <va-button @click="login()" class="w-1/2 text-white">Iniciar sesión</va-button>
        <va-button
          preset="plain"
          class="w-1/2 text-xs"
          gradient
          color="primary"
          @click="($event) => navigateTo('/sign-up')"
          >¿Aún no tienes cuenta?</va-button
        >
      </va-card-actions>
    </div>
  </div>
</template>
<script>
definePageMeta({
  middleware: ["auth-middleware"],
});
import {validationMessages as msg}  from "~/utils/validation.messages";
import { EMAIL_REGEX, PASSWORD_REGEX } from "~/utils/regex";
export default {
  setup() {
    const client = useSupabaseClient();
    const user  = useSupabaseUser();
    const loading = useLoading();
    return {
      client,
      user,
      loading
    };
  },
  data() {
    return {
      emailInput: "",
      passwordInput: "",

      emailRules: [(v) => (v && EMAIL_REGEX.test(v)) || msg.email],
      passwordValidation: [
        (v) => (v && PASSWORD_REGEX.test(v)) || msg.password,
      ],

      errorAlert: false,
      isPasswordVisible: false,
      errorMessage: "",

    };
  },
  methods:{
    async login(){
      this.loading = true;
      const { user, error} = await this.client.auth.signInWithPassword(
        {
          email: this.emailInput,
          password: this.passwordInput
        }
      );
      this.loading = false;
      if(error){
        this.$vaToast.init({color:"danger", message: error.message,  duration: 3000})
      }
      if(user.value){
        navigateTo("/dashboard")
      }
    },
  },
  onMounted(){
    watchEffect(()=>{
      if(this.user.value){
        navigateTo("/dashboard")
      }
    })
  }
};
</script>