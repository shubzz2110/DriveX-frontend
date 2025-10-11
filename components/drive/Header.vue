<template>
  <div
    class="flex items-center justify-between w-full h-max px-5 py-2.5 bg-white border-b border-surface-300"
  >
    <div class="flex items-center gap-2.5">
      <img src="/logo.svg" class="h-10" alt="" />
      <h1 class="app-name">DriveX</h1>
    </div>
    <!-- <IconField>
      <InputIcon class="pi pi-search" />
      <InputText
        placeholder="Search"
        role="searchbox"
        size="small"
        class="xl:min-w-[28rem] rounded-full !bg-blk-30"
      />
    </IconField> -->
    <div class="flex items-center space-x-2.5">
      <!-- <ToggleSwitch 
        @value-change="handleColorMode"
        v-model="isColorPreferenceDarkMode">
        <template #handle="{ checked }">
          <i :class="['!text-xs pi', { 'pi-moon': checked, 'pi-sun': !checked }]" />
        </template>
      </ToggleSwitch> -->
      <button
        v-tool-tip="{
          value: 'Help with DriveX',
          showDelay: 300,
          hideDelay: 300,
        }"
        class="utility-button text-surface-700 border border-surface-800"
      >
        <i class="pi pi-question text-xs"></i>
      </button>
      <button
        @click="toggle"
        v-tool-tip="{ value: 'Shubham Homkar', showDelay: 300, hideDelay: 300 }"
        class="utility-button bg-pink-500 text-sm text-surface-0"
      >
        SH
      </button>
      <button
        v-tool-tip="{
          value: 'Collapse sidebar',
          showDelay: 300,
          hideDelay: 300,
        }"
        class="text-surface-600 p-1.5 hover:bg-surface-300 flex items-center justify-center rounded-md transition-all lg:hidden"
        @click="appStore.toggleSidebar()"
      >
        <i class="pi pi-bars leading-0 text-xl"></i>
      </button>
      <!-- <button v-else @click="toggle">
        <img
          :src="authStore.user?.avatar"
          alt="avatar"
          class="utility-button object-cover"
        />
      </button> -->
      <Popover ref="op">
        <div class="flex flex-col w-full min-w-80">
          <div class="flex items-center justify-between w-full h-max">
            <div class="flex items-center gap-2.5">
              <img src="/logo.svg" class="h-8" alt="" />
              <h1 class="text-brand font-normal text-base leading-5">DriveX</h1>
            </div>
            <button
              class="px-3 py-1.5 rounded transition-all hover:bg-surface-300 text-surface-800 font-normal text-sm leading-5 flex items-center gap-2.5"
            >
              <i class="pi pi-sign-out"></i>
              <span>Logout</span>
            </button>
          </div>
          <div class="flex items-center space-x-5 w-full py-5">
            <!-- <img
              v-if="authStore.user && authStore.user.avatar"
              class="min-w-24 min-h-24 h-24 w-24 rounded-full object-cover border border-surface-300"
              :src="authStore.user.avatar"
              alt="avatar"
            /> -->
            <div
              class="min-w-24 min-h-24 h-24 w-24 rounded-full bg-pink-500 flex items-center justify-center"
            >
              <h1 class="text-surface-0 text-3xl capitalize">SH</h1>
            </div>
            <div class="flex flex-col space-y-1.5 flex-grow">
              <h1
                class="text-surface-800 font-semibold text-sm leading-4 capitalize"
              >
                Shubham Homkar
              </h1>
              <p class="text-surface-400 font-normal text-sm">
                homkar1997@gmail.com
              </p>
              <button
                class="text-sm font-normal text-blue-500 hover:text-blue-600 underline w-max"
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  </div>
</template>

<script setup lang="ts">
const appStore = useAppStore()
const op = ref();
const toggle = (event: any) => {
  op.value.toggle(event);
};
</script>

<style scoped>
.app-name {
  @apply text-brand font-normal text-2xl;
}

.utility-button {
  @apply min-w-8 min-h-8 w-8 h-8 rounded-full flex items-center justify-center;
}
</style>
