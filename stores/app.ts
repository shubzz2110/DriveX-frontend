export const useAppStore = defineStore("appStore", () => {
  const showSidebar = ref<boolean>(false);
  const showCreateFolderModal = ref<boolean>(false)
  const showUploadFileModal = ref<boolean>(false)

  const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value
  }

  const openCreateFolderModal = () => {
    showCreateFolderModal.value = true
  }

  const openUploadFileModal = () => {
    showUploadFileModal.value = true
  }

  const closeCreateFolderModal = () => {
    showCreateFolderModal.value = false
  }

  const closeUploadFileModal = () => {
    showUploadFileModal.value = false
  }
  
  return {
    showSidebar,
    showCreateFolderModal,
    showUploadFileModal,
    toggleSidebar,
    openCreateFolderModal,
    openUploadFileModal,
    closeCreateFolderModal,
    closeUploadFileModal
  }
})