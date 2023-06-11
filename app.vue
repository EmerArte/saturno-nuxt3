<template>
  <div class="min-h-screen" >
    <div
      v-if="loading"
      class="fixed left-0 top-0 h-full w-full z-50 backdrop-blur-sm"
    >
    <div class="flex flex-col justify-center items-center h-full w-full">
      <va-inner-loading loading :size="40" icon="public"></va-inner-loading>
    </div>
    </div>
    <NuxtLayout></NuxtLayout>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp();
const loading = useLoading();
nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});
</script>