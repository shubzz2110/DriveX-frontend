<template>
  <div
    class="flex flex-col w-full h-full min-h-dvh items-center justify-center p-2.5 sm:p-0"
  >
    <div
      class="bg-white rounded-2.5xl flex flex-col w-full min-h-[40rem] h-auto sm:max-w-[28rem] p-5 md:p-7 border border-surface-300"
    >
      <div class="flex flex-col items-center justify-center">
        <img src="/logo.svg" alt="logo" class="w-40" />
        <h1 class="text-brand font-black text-2xl">DriveX</h1>
      </div>
      <slot />
    </div>
    <Toast />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
