<template>
    <div>
      <va-button
        preset="plain"
        class="w-1/2"
        gradient
        color="primary"
        @click="signOut"
        >Cerrar sesión</va-button
      >
    </div>
  </template>
  <script>
  definePageMeta({
    middleware: ["auth-middleware"],
  });
  
  export default {
    setup() {
      const supabase = useSupabaseClient();
      const user = useSupabaseUser();
      return {
        supabase,
        user,
      };
    },
    data() {
      return {
        hola: "",
        loading: false,
      };
    },
    methods: {
      async signOut() {
        try {
          this.loading = true;
          let { error } = await this.supabase.auth.signOut();
          navigateTo("/login");
          if (error) throw error;
          this.user = null;
        } catch (error) {
          alert(error.message);
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  