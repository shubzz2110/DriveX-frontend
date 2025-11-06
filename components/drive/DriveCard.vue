<template>
  <div
    class="group relative bg-surface-100 border border-surface-300 transition-all duration-300 ease-in-out aspect-[4/5] sm:aspect-[3/4] 4xl:aspect-[5/6] flex flex-col w-full gap-2.5 p-2.5 hover:bg-surface-200 cursor-pointer"
  >
    <!-- Header -->
    <div class="flex items-center w-full gap-2.5">
      <div class="flex items-center gap-x-2.5 grow min-w-0">
        <i
          :class="[
            'pi',
            fileIcon,
            'leading-none',
            'text-surface-700',
            'shrink-0',
          ]"
        ></i>
        <h1
          class="text-surface-800 font-semibold text-sm leading-4 truncate capitalize"
          :title="file.file_name"
        >
          {{ file.file_name }}
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

    <!-- Thumbnail or Icon -->
    <div
      class="border border-surface-300 flex-1 bg-white rounded-lg overflow-hidden relative"
    >
      <!-- Show image thumbnail if available -->
      <img
        v-if="file.thumbnail_url"
        :src="file.thumbnail_url"
        :alt="file.file_name"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <!-- Otherwise show icon -->
      <div
        v-else
        class="absolute inset-0 flex items-center justify-center text-surface-600"
      >
        <i :class="['pi', fileIcon, 'text-5xl']"></i>
      </div>
    </div>

    <h1 class="text-surface-600 font-normal text-xs leading-3">
      Uploaded on:
      <span class="font-semibold">Sept 31, 2025</span>
    </h1>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { MenuItem } from "primevue/menuitem";

const props = defineProps<{
  file: {
    file_name: string;
    file_type?: string;
    thumbnail_url?: string;
  };
}>();

const emits = defineEmits<{
  (e: "view-file", file: typeof props.file): void;
  (e: "move-to-trash", file: typeof props.file): void;
}>();

const menu = ref();
const menuItems: MenuItem[] = [
  { label: "View", icon: "pi pi-eye", command: () => emits("view-file", props.file) },
  { label: "Move to trash", icon: "pi pi-trash", command: () => emits("move-to-trash", props.file) },
];
const toggle = (event: Event) => {
  menu.value.toggle(event);
};

// ✅ Dynamically choose icon based on file extension/type
const fileIcon = computed(() => {
  const name = props.file.file_name?.toLowerCase() || "";
  if (name.endsWith(".pdf")) return "pi-file-pdf";
  if (name.endsWith(".doc") || name.endsWith(".docx")) return "pi-file-word";
  if (name.endsWith(".xls") || name.endsWith(".xlsx")) return "pi-file-excel";
  if (name.endsWith(".csv")) return "pi-file-excel";
  if (name.endsWith(".ppt") || name.endsWith(".pptx")) return "pi-file";
  if (name.endsWith(".jpg") || name.endsWith(".jpeg") || name.endsWith(".png"))
    return "pi-image";
  if (name.endsWith(".zip") || name.endsWith(".rar")) return "pi-file-archive";
  if (name.endsWith(".txt")) return "pi-file";
  if (name.endsWith(".json")) return "pi-code";
  if (name.endsWith(".mp4") || name.endsWith(".mov")) return "pi-video";
  return "pi-file"; // Default
});
</script>

<style scoped></style>
