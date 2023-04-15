<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div class="w-[80%] md:w-1/3">
      <h2 class="text-center text-xl uppercase font-extrabold font-mono my-3">
        Iniciar sesión
      </h2>
      <va-card-content>
        <va-form ref="form" @validation="validation = $event">
          <div class="flex flex-col space-y-2">
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
    </div>
  </div>
</template>
<script>
definePageMeta({
  middleware: ["auth-middleware"],
});
import { EMAIL_REGEX, PASSWORD_REGEX } from "~/utils/regex";
export default {
  setup() {
    return {};
  },
  data() {
    return {
      emailInput: "",
      passwordInput: "",

      emailRules: [(v) => (v && EMAIL_REGEX.test(v)) || msg.email],
      passwordValidation: [
        (v) => (v && PASSWORD_REGEX.test(v)) || msg.password,
      ],

      isCloseableAlertVisible: true,
    };
  },
};
</script>
<style>
.figura-rara {
  height: 35%;
  clip-path: polygon(0% 30%, 100% 0%, 100% 100%, 0% 100%);
}
</style>
