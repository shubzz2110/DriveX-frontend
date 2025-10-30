<template>
  <DataTable
    :value="files"
    scrollable
    scroll-height="flex"
    :lazy="true"
    :paginator="false"
  >
    <!-- 📄 File Name -->
    <Column field="name" header="Name" style="min-width: 220px">
      <template #body="{ data }">
        <div class="flex items-center gap-2">
          <i
            :class="`pi leading-none text-surface-600 shrink-0 ${fileIcon(
              data
            )}`"
          ></i>
          <span class="truncate max-w-[250px] font-semibold capitalize">{{
            data.file_name
          }}</span>
        </div>
      </template>
    </Column>

    <!-- 💾 Type -->
    <Column field="file_extension" header="Extension" style="min-width: 100px">
      <template #body="{ data }">
        <span class="uppercase">{{ data.file_extension }}</span>
      </template>
    </Column>

    <!-- 💾 Size -->
    <Column field="file_size" header="Size" style="min-width: 100px" >
      <template #body="{ data }">
        <span v-if="data.file_size">{{ formatFileSize(data.file_size) }}</span>
      </template>
    </Column>

    <!-- ⬆ Uploaded On -->
    <Column field="updated_at" header="Date modified" style="min-width: 140px">
      <template #body="{ data }">
        <span>{{ moment(data.updated_at).format('MMM DD, YYYY') }}</span>
      </template>
    </Column>

    <!-- ⚙️ Actions -->
    <Column header="Action" style="min-width: 90px; text-align: right">
      <template #body="{ data }">
        <div class="flex items-center gap-2.5">
          <button
            @click="$emit('view-file', data)"
            class="w-10 h-10 text-surface-600 hover:bg-surface-200 rounded-full flex items-center justify-center transition-colors cursor-pointer"
          >
            <i class="pi pi-eye leading-none"></i>
          </button>
          <button
            @click="$emit('delete-file', data)"
            class="w-10 h-10 text-surface-600 hover:bg-surface-200 rounded-full flex items-center justify-center transition-colors cursor-pointer"
          >
            <i class="pi pi-trash leading-none"></i>
          </button>
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import type { FileItem } from "~/lib/definations";
import moment from 'moment'

defineProps<{
  files: FileItem[];
}>();

defineEmits(["view-file", "delete-file"]);

const fileIcon = (file: FileItem) => {
  const name = file.file_name?.toLowerCase() || "";
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
};
</script>

<style scoped></style>
