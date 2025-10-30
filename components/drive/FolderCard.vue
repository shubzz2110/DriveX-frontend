<template>
  <div
    class="group relative bg-surface-100 border border-surface-300 transition-all duration-300 ease-in-out flex flex-col gap-2.5 p-3 hover:bg-surface-200 cursor-pointer select-none"
    @dblclick="$emit('openFolder', folder)"
  >
    <div class="flex items-center w-full gap-2.5">
      <div class="flex items-center gap-x-2.5 grow min-w-0">
        <i class="pi pi-folder text-surface-700"></i>
        <h1
          class="text-surface-800 font-semibold text-sm leading-4 truncate capitalize"
          :title="folder.file_name"
        >
          {{ folder.file_name }}
        </h1>
      </div>

      <button
        class="min-w-8 min-h-8 w-8 h-8 text-surface-700 cursor-pointer hover:bg-surface-300 rounded-full flex items-center justify-center"
        @click.stop="toggle"
      >
        <i class="pi pi-ellipsis-v text-sm leading-none"></i>
      </button>

      <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";

defineProps<{ folder: any }>();
defineEmits(['openFolder'])
const menu = ref();
const menuItems: MenuItem[] = [
  { label: "View", icon: "pi pi-eye" },
  { label: "Move to trash", icon: "pi pi-trash" },
];
const toggle = (event: Event) => {
  menu.value.toggle(event);
};
</script>
