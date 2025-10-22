<template>
  <div
    class="group relative bg-surface-100 border border-surface-300 transition-all duration-300 ease-in-out aspect-[4/5] sm:aspect-[3/4] 4xl:aspect-[5/6] flex flex-col w-full gap-2.5 p-2.5 hover:bg-surface-200 cursor-pointer"
  >
    <div class="flex items-center w-full gap-2.5">
      <div class="flex items-center gap-x-2.5 grow">
        <i class="pi pi-file leading-none text-surface-700"></i>
        <h1
          class="text-surface-800 font-semibold text-sm leading-4 line-clamp-1"
        >
          Lorem ipsum dolor sit.
        </h1>
      </div>
      <button
        class="min-w-8 min-h-8 w-8 h-8 text-surface-700 cursor-pointer hover:bg-surface-300 rounded-full"
      >
        <i class="pi pi-ellipsis-v text-sm leading-none"></i>
      </button>
    </div>
    <div class="border border-surface-300 flex-1 bg-white"></div>
    <h1 class="text-surface-600 font-normal text-xs leading-3">
      Uploaded on: <span class="font-semibold">Sept 31, 2025</span>
    </h1>
  </div>
</template>

<script setup lang="ts">
// defineProps<{
//   name: string;
//   type?: string;
//   size?: string;
//   thumbnail?: string;
// }>();
</script>
<style scoped></style>
