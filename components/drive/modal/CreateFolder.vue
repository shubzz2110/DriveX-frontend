<template>
  <Dialog
    :visible="showModal"
    @update:visible="emits('closeModal')"
    modal
    :draggable="false"
    header="Create folder"
    :dismissable-mask="true"
    class="min-w-[22rem]"
    content-class="flex flex-col w-full gap-5"
  >
    <form
      @submit.prevent="handleCreateFolder"
      method="post"
      class="flex flex-col w-full gap-7"
    >
      <div class="flex flex-col space-y-1.5">
        <label for="id-create-folder" class="form-label">Folder: </label>
        <IconField>
          <InputIcon class="pi pi-folder-open" />
          <InputText
            id="id-create-folder"
            v-model="folderName"
            placeholder="Enter folder name"
            :disabled="isLoading"
          />
        </IconField>
        <span v-if="errors['folderName']" class="text-error">{{
          errors["folderName"]
        }}</span>
      </div>
      <Button type="submit" label="Create" severity="brand" />
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import * as yup from "yup";
import type { FileItem } from "~/lib/definations";

const props = defineProps<{
  showModal: boolean;
  fetchFiles: () => void;
  parent: FileItem | null;
}>();

const emits = defineEmits(["closeModal"]);

const { $axios } = useNuxtApp();
const toast = useToast();

const folderName = ref<string>("Untitled Folder");
const isLoading = ref<boolean>(false);
const errors = ref<any>({});

const formSchema = yup.object().shape({
  folderName: yup.string().required("Folder name is required"),
});

const validateField = async (field: any) => {
  try {
    await formSchema.validateAt(field, {
      folderName: folderName.value,
    });
    delete errors.value[field];
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      errors.value[field] = error.message;
    }
  }
};

const validateForm = async () => {
  try {
    await formSchema.validate(
      {
        folderName: folderName.value,
      },
      { abortEarly: false }
    );
    errors.value = {};
    return true;
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      err.inner.forEach((error: any) => {
        errors.value[error.path] = error.message;
      });
    }
    return false;
  }
};

const handleCreateFolder = async () => {
  if (await validateForm()) {
    const payload: any = {
      file_name: folderName.value,
      is_folder: true,
    };
    console.log(props.parent)
    if (props.parent) {
      payload["parent"] = props.parent.id.toString();
    }

    try {
      isLoading.value = true;
      await $axios.post("/upload/files/", {
        file_name: folderName.value,
        is_folder: true,
        parent: props.parent?.id.toString(),
      });
      props.fetchFiles();
      toast.add({
        severity: "success",
        summary: "Success",
        detail: `Folder ${folderName.value} created successfully`,
        life: 5000,
      });
      emits("closeModal");
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }
};

const fields = {
  folderName,
} as any;

Object.keys(fields).forEach((key) => {
  watch(fields[key], () => validateField(key));
});
</script>

<style scoped></style>
