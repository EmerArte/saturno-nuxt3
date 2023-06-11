<template>
    <div>
      <h1>Dashboard</h1>
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
    },
  };
  </script>
  