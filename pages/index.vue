<template>
  <div></div>
</template>

<script setup lang="ts">
const router = useRouter();
onBeforeMount(() => router.push("/auth/signin"));
</script>

<style scoped></style>
