<template>
  <div
    class="flex flex-col bg-white h-full flex-1 border-r border-surface-300 transition-all duration-300 ease-in-out w-full fixed max-w-[90%] sm:max-w-[250px] z-50"
    :class="
      appStore.showSidebar
        ? '-translate-x-0'
        : '-translate-x-full lg:translate-x-0'
    "
  >
    <div class="p-5 border-b border-surface-300">
      <Button
        @click="toggle"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        severity="brand"
        label="Create"
        icon="pi pi-plus"
        class="!w-28"
      />
      <Menu ref="menu" id="overlay_menu" :model="menuItems" :popup="true" />
    </div>
    <div
      class="flex flex-col w-full space-y-2.5 py-5 border-b border-surface-300"
    >
      <NuxtLink
        v-for="(item, index) in navigationItems"
        :to="item.url"
        class="navigation-item"
        exact-active-class="bg-brand !text-surface-0 hover:!bg-brand"
        :key="index"
      >
        <i :class="`pi ${item.icon}`"></i>

        <!-- Always render span, but control visibility smoothly -->
        <span
          class="whitespace-nowrap overflow-hidden transition-all duration-300"
        >
          {{ item.name }}
        </span>
      </NuxtLink>
    </div>
    <div class="flex flex-col space-y-2.5 p-5">
      <div class="flex items-center justify-between w-full">
        <h1 class="text-surface-800 font-semibold text-sm leading-4">
          Storage
        </h1>
        <h1 class="text-surface-800 font-normal text-xs">20%</h1>
      </div>
      <div
        class="relative bg-surface-200 w-full h-2 rounded-full overflow-hidden"
      >
        <div class="absolute bg-accent h-full" style="width: 20%"></div>
      </div>
      <p class="text-surface-500 font-normal text-xs leading-4">
        10 of 100GB used
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from "primevue/menuitem";

const appStore = useAppStore();
const menu = ref();

const menuItems: MenuItem[] = [
  { label: "Upload File", icon: "pi pi-file" },
  { label: "Create Folder", icon: "pi pi-folder" },
];

const toggle = (event: Event) => {
  menu.value.toggle(event);
};

const navigationItems = ref([
  { id: 1, icon: "pi-home", name: "My Drive", slug: "drive", url: "/drive" },
  {
    id: 2,
    icon: "pi-trash",
    name: "Trash",
    slug: "trash",
    url: "/drive/trash",
  },
  {
    id: 3,
    icon: "pi-bell",
    name: "Notifications",
    slug: "notifications",
    url: "/drive/notifications",
  },
]);
</script>

<style scoped>
.navigation-item {
  @apply text-start flex items-center gap-x-2.5 px-5 py-[17px] text-sm font-normal text-surface-800 hover:bg-surface-200 leading-full;
}
</style>
