<template>
  <div class="flex flex-col w-full h-full min-h-dvh overflow-hidden">
    <DriveHeader />
    <div class="flex flex-col w-full overflow-hidden">
      <DriveSidebar />
      <Transition name="fade">
        <Loading v-if="isLoading" />
      </Transition>
      <div class="flex flex-col w-full h-[calc(100vh-61px)] overflow-auto lg:ml-[249px] lg:max-w-[calc(100dvw-249px)]">
        <slot />
      </div>
    </div>
    <Toast :message="{ life: 5000 }" />
  </div>
</template>

<script setup lang="ts">
const { isLoading } = useLoading();
const { $axios } = useNuxtApp();
const authStore = useAuthStore();
const fetchUser = async () => {
  try {
    const response = await $axios.get("/auth/user/");
    authStore.setUser(response.data);
  } catch (error) {
    console.error("Error fetching user in layout:", error);
  }
};

onMounted(() => {
  fetchUser();
});
</script>

<style>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
