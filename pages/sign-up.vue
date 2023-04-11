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
  </div>
</template>
<script>
definePageMeta({
  middleware: ["auth-middleware"],
});
const emailRegex =
  /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/u;
//const passwordRegex =
//  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/u;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/u;
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
      isCloseableAlertVisible: true,
      errorMessage: "",
      //validations
      emailRules: [(v) => (v && emailRegex.test(v)) || "E-mail no válido"],
      phoneNumberRules: [
        (v) =>
          (v && /^[0-9 ]{10,}$/u.test(v)) || "Número de Teléfono no válido",
      ],
      identificationNumberRules: [
        (v) =>
          (v && /^[0-9]{6,}$/u.test(v)) || "Número de identificación no válido",
      ],
      passwordValidation: [
        (v) =>
          (v && passwordRegex.test(v)) ||
          "La contraseña ingresada no satisface las politicas de seguridad",
      ],
      validation: null,

      //utils
      isPasswordVisible: false,
      cityAvailable: ["Montería", "Pueblo Nuevo"],
      identificationAvaliable: ["C.C", "T.I", "C.E"],
    };
  },
  methods: {
    async signUp() {
      const { data, error } = await this.client.auth.signUp({
        email: "arteagaemer@gmail.com",
        password: "emer2009",
        phone: "3022773185"
      });
      console.log(data,error);
      if (error) {
        this.errorMessage = error.message;
        this.showAlert();
      } else {
        const { _, error } = await this.client.from("profiles").insert([
          {
            id: data.user.id,
            first_name: "Emer",
            last_name: "Arteaga",
            identity_number: 1003048255,
            identity_type: "C.C",
            addresss: "CRA 13W #23-44",
          },
        ]);
        if (error) {
          this.errorMessage = error.message;
          this.showAlert();
        }else{
          navigateTo('/confirm-account')
        }
      }
      // this.$refs.form.validate();
      // if (this.validation === true) {
      //   const { user, error } = await this.client.auth.signUp({
      //     email: this.emailInput,
      //     password: this.passwordInput,
      //     options: {
      //       data: {
      //         first_name: this.nameInput,
      //         last_name: this.lastNameInput,
      //         identity_number: this.identificationNumberInput,
      //         identity_type: this.typeIdentificationInput,
      //         phone_number: this.phoneNumberInput,
      //         addresss: this.direccionInput,
      //       },
      //     },
      //   });
      //   console.log(user, error);
      // } else {
      //   setTimeout(() => (this.isCloseableAlertVisible = false), 1000);
      // }
    },
    showAlert() {
      setTimeout(() => (this.isCloseableAlertVisible = false), 1000);
    },
  },
};
</script>
<style></style>
