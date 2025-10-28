<template>
  <div class="flex flex-col w-full h-full overflow-hidden">
    <h1 class="page-heading">Trash</h1>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
  middleware: 'auth',
});
</script>

<style scoped>

</style>