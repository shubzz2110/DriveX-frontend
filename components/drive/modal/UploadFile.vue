<template>
  <Dialog
    :visible="showModal"
    @update:visible="emits('closeModal')"
    modal
    :draggable="false"
    :header="
      selectedFiles.length === 0
        ? 'Upload Files'
        : `${selectedFiles.length} ${
            selectedFiles.length === 1 ? 'file' : 'files'
          } selected`
    "
    :dismissable-mask="true"
    class="min-w-[44rem] min-h-[34rem]"
    content-class="flex flex-col w-full"
  >
    <div
      v-if="selectedFiles.length === 0"
      class="flex flex-col items-center justify-center w-full h-full flex-1"
    >
      <div
        class="flex items-center justify-center relative w-full h-full border border-dashed border-surface-400 flex-1 hover:bg-surface-100 hover:border-brand transition-all ease-in-out duration-300 cursor-pointer"
      >
        <input
          type="file"
          multiple
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          id="file-upload"
          @change="handleFileInput"
        />
        <div class="flex flex-col items-center gap-2.5">
          <div
            class="min-w-28 h-28 w-28 min-h-28 bg-surface-200 flex items-center justify-center rounded-full"
          >
            <i
              class="pi pi-upload leading-none text-surface-800 text-[42px]"
            ></i>
          </div>
          <h1 class="text-surface-800 font-bold text-2xl">
            Drag and drop files here
          </h1>
          <h1 class="text-surface-800 font-normal text-sm">
            or <span class="text-blue-500">browse files</span>
          </h1>
          <h1 class="text-surface-800 font-normal text-sm">
            Upload multiple files at once
          </h1>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col w-full h-full gap-2.5">
      <div
        v-for="(file, index) in selectedFiles"
        :key="index"
        class="flex items-center justify-between bg-surface-100 border border-surface-300 p-2.5"
      >
        <div class="flex items-center gap-2.5">
          <div
            class="bg-surface-200 min-w-10 min-h-10 flex items-center justify-center"
          >
            <i class="pi pi-image text-lg leading-none text-surface-700"></i>
          </div>
          <div class="flex flex-col gap-1.5">
            <h1 class="text-surface-800 font-semibold text-sm leading-4">
              {{ file.name }}
            </h1>
            <p class="mb-0 text-xs text-surface-500 font-normal leading-3">
              {{ formatFileSize(file.size) }}
            </p>
          </div>
        </div>
        <button
          @click="handleRemoveFile(index)"
          class="pi pi-times text-surface-700 text-base leading-none"
        ></button>
      </div>
      <Button
        @click="uploadFiles"
        severity="brand"
        :label="`Upload ${selectedFiles.length} ${
          selectedFiles.length === 1 ? 'file' : 'files'
        }`"
      />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  showModal: boolean;
  fetchFiles: () => void;
}>();
const emits = defineEmits(["closeModal"]);

const { startLoading, stopLoading } = useLoading()
const { $axios } = useNuxtApp()
const toast = useToast()

const selectedFiles = ref<File[]>([]);

const handleFileInput = (e: Event) => {
  const files = Array.from((e.target as HTMLInputElement)?.files || []);
  selectedFiles.value = files;
};

const handleRemoveFile = (index: number) => {
  selectedFiles.value = selectedFiles.value.filter((file, i) => i !== index);
};

const uploadFiles = async () => {
  if (!selectedFiles.value.length) return;

  const formData = new FormData();
  selectedFiles.value.forEach((file) => {
    formData.append("files", file);
  });

  try {
    startLoading()
    await $axios.post('/upload/files/', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    props.fetchFiles()
    toast.add({
      severity: 'success',
      summary: "Success",
      detail: "File has been uploaded successfully",
      life: 5000
    })
    emits('closeModal')
  } catch (error) {
    console.log(error)
  } finally {
    stopLoading()
  }
};
</script>

<style scoped></style>
