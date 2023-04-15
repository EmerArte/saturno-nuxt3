<template>
  <div class="flex flex-col justify-center h-screen">
    <div class="absolute top-0 right-0 z-10 w-2/3 md:w-1/2 mr-2">
      <va-alert
        v-model="isCloseableAlertVisible"
        v-if="validation == false"
        closeable
        color="danger"
        >{{ errorMessage }}</va-alert
      >
    </div>

    <div class="flex flex-row justify-center items-center">
      <va-card class="w-[85%] md:w-1/3">
        <!-- Titulo -->
        <h2
          class="text-center text-xl text-blue-600 uppercase font-extrabold font-sans my-3"
        >
          Registrar usuario
        </h2>
        <va-form ref="form" @validation="validation = $event">
          <va-card-content>
            <div class="flex flex-col space-y-2">
              <va-input
                v-model="nameInput"
                label="Nombres"
                :max-length="30"
                :rules="[
                  (value) =>
                    (value && value.length > 0) || 'El campo es obligatorio',
                ]"
              />
              <va-input
                v-model="lastNameInput"
                label="Apellidos"
                :rules="[
                  (value) =>
                    (value && value.length > 0) || 'El campo es obligatorio',
                ]"
                :max-length="30"
              />
              <va-select
                v-model="typeIdentificationInput"
                class="mt-3"
                label="Tipo de identificación"
                :rules="[
                  (value) =>
                    (value && value.length > 0) || 'El campo es obligatorio',
                ]"
                :options="identificationAvaliable"
              />
              <va-input
                v-model="identificationNumberInput"
                label="Número de identificación"
                :mask="{
                  numericOnly: true,
                  blocks: [16],
                }"
                :rules="identificationNumberRules"
                :max-length="16"
              />
              <va-input
                v-model="phoneNumberInput"
                label="Número de teléfono"
                :mask="{
                  numericOnly: true,
                  blocks: [3, 3, 4],
                }"
                :rules="phoneNumberRules"
                :max-length="10"
              />
              <va-input
                v-model="direccionInput"
                label="Dirección"
                type="text"
                :rules="[
                  (value) =>
                    (value && value.length > 0) || 'El campo es obligatorio',
                ]"
                :max-length="30"
              />
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
          </va-card-content>
          <va-card-actions align="between">
            <va-button @click="signUp()" class="w-1/2">Registrarse</va-button>
            <va-button
              preset="plain"
              class="w-1/2"
              gradient
              color="primary"
              @click="($event) => navigateTo('/login')"
              >¿Ya tienes cuenta?</va-button
            >
          </va-card-actions>
        </va-form>
      </va-card>
    </div>
    <!-- Modal -->
    <va-modal v-model="showCustomContent">
      <template #content="{ ok }">
        <div class="flex flex-col items-center justify-center">
          <img src="~/assets/email-message.svg" class="w-32 md:w-42 lg:w-60" />

          <h1
            class="text-2xl sm:text-5xl font-mono uppercase lg:text-4xl font-extrabold leading-none tracking-tight text-gray-900"
          >
            Confirma tu cuenta!
          </h1>
          <p class="font-sans leading-normal text-justify my-2">
            Hemos enviado un correo a {{ email }} para activar tu cuenta. Por
            favor revisa tu correo electronico y sigue los pasos enviados en el.
            Gracias por ser parte de Doggy!
          </p>
          <va-card-actions align="center">
            <va-button color="primary" @click="ok"> Entendido! </va-button>
          </va-card-actions>
        </div>
      </template>
    </va-modal>
  </div>
</template>
<script>
definePageMeta({
  middleware: ["auth-middleware"],
});
import {validationMessages as msg}  from "~/utils/validation.messages";
import {EMAIL_REGEX, PASSWORD_REGEX,ID_NUMBER_REGEX, PHONE_REGEX} from '~/utils/regex'
export default {
  setup() {
    //SUPABASE CLIENT
    const client = useSupabaseClient();
    return {
      client,
    };
  },
  data() {
    return {
      //form imputs
      nameInput: "",
      lastNameInput: "",
      phoneNumberInput: "",
      emailInput: "",
      cityInput: "",
      passwordInput: "",
      typeIdentificationInput: "",
      identificationNumberInput: null,
      direccionInput: "",

      //variables
      email: null,
      //validations
      emailRules: [(v) => (v && EMAIL_REGEX.test(v)) || msg.email],
      phoneNumberRules: [
        (v) =>
          (v && PHONE_REGEX.test(v)) || msg.phone
      ],
      identificationNumberRules: [
        (v) =>
          (v && ID_NUMBER_REGEX.test(v)) || msg.idNumber
      ],
      passwordValidation: [
        (v) =>
          (v && PASSWORD_REGEX.test(v)) ||
          msg.password
      ],
      validation: null,
      //utils
      isPasswordVisible: false,
      cityAvailable: ["Montería", "Pueblo Nuevo"],
      identificationAvaliable: ["C.C", "T.I", "C.E"],
      isCloseableAlertVisible: true,
      showCustomContent: false,
      errorMessage: "",
    };
  },
  methods: {
    async signUp() {
      this.$refs.form.validate();
      if (this.validation === true) {
        this.email = this.emailInput;
        const { data, error } = await this.client.auth.signUp({
          email: this.emailInput,
          password: this.passwordInput,
          phone: this.phoneNumberInput,
        });
        if (error) {
          this.errorMessage = error.message;
          this.showAlert();
        } else {
          const { _, error } = await this.client.from("profiles").insert([
            {
              id: data.user.id,
              first_name: this.nameInput,
              last_name: this.lastNameInput,
              identity_number: this.identificationNumberInput,
              identity_type: this.typeIdentificationInput,
              phone_number: this.phoneNumberInput,
              addresss: this.direccionInput,
            },
          ]);
          if (error) {
            this.errorMessage = error.message;
            this.showAlert();
          } else {
            this.showCustomContent = true;
          }
        }
      } else {
        setTimeout(() => (this.isCloseableAlertVisible = false), 1000);
      }
    },
  },
};
</script>
