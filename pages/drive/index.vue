<template>
  <div class="flex flex-col w-full h-full overflow-hidden p-5 gap-y-10">
    <h1 class="page-heading">My Drive</h1>
    <div
      class="flex flex-col xl:flex-row xl:items-center xl:justify-between w-full h-max gap-5"
    >
      <div class="flex flex-col lg:flex-row xl:items-center gap-5">
        <IconField>
          <InputIcon class="pi pi-search" />
          <InputText placeholder="Search in drive" class="xl:!w-96 w-full" />
        </IconField>
        <Button
          v-if="!showFilters"
          @click="showFilters = true"
          severity="brand"
          label="Add Filters"
          icon="pi pi-filter"
          icon-class="leading-0"
        />
        <Button
          v-else
          @click="showFilters = false"
          severity="danger"
          label="Remove Filters"
          icon="pi pi-times"
          icon-class="leading-0"
        />
      </div>
      <div class="flex flex-row items-center gap-5">
        <SelectButton
          v-model="view"
          :options="viewOptions"
          option-label="value"
          data-key="value"
          aria-labelledby="custom"
          option-value="value"
        >
          <template #option="slotProps">
            <i :class="slotProps.option.icon" class="leading-0"></i>
          </template>
        </SelectButton>
        <IconField class="flex-grow xl:flex-grow-0">
          <InputIcon class="pi pi-sort-alt text-surface-500 leading-0" />
          <Select
            :options="sortOptions"
            v-model="sortBy"
            :highlight-on-select="true"
            option-label="name"
            option-value="value"
            placeholder="Sort By"
            checkmark
          />
        </IconField>
      </div>
    </div>
    <div
      v-if="view === 'card'"
      class="flex flex-col w-full h-full flex-1 overflow-hidden"
    >
      <div
        class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 4xl:grid-cols-6 gap-5 overflow-auto"
      >
        <DriveCard v-for="n in 20" :key="n" />
      </div>
    </div>
    <div v-if="view === 'list'" class="overflow-hidden flex-1">
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
              <i class="pi pi-file text-surface-600 text-base"></i>
              <span class="truncate max-w-[180px] font-semibold">{{
                data.name
              }}</span>
            </div>
          </template>
        </Column>

        <!-- 💾 Size -->
        <Column field="size" header="Size" style="min-width: 100px" />

        <!-- ⬆ Uploaded On -->
        <Column
          field="uploaded"
          header="Uploaded On"
          style="min-width: 140px"
        />

        <!-- ✏ Modified On -->
        <Column
          field="modified"
          header="Modified On"
          style="min-width: 180px"
        />

        <!-- ⚙️ Actions -->
        <Column header="Action" style="min-width: 90px; text-align: right">
          <template #body>
            <button
              class="w-8 h-8 text-surface-600 hover:bg-surface-200 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >
              <i class="pi pi-ellipsis-h text-sm"></i>
            </button>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});
const showFilters = ref<boolean>(false);
const view = ref<"card" | "list">("card");
const viewOptions = ref([
  { icon: "pi pi-th-large ", value: "card" },
  { icon: "pi pi-list ", value: "list" },
]);
const sortBy = ref<string | undefined>(undefined);
const sortOptions = [
  { name: "Latest", value: "latest" },
  { name: "A - Z", value: "az" },
  { name: "Z - A", value: "za" },
];
const files = ref(
  Array.from({ length: 50 }, (_, i) => ({
    name: `File_${i + 1}_Lorem_ipsum_dolor.pdf`,
    size: "34 MB",
    uploaded: "Sept 31, 2025",
    modified: "Sept 31, 2025, 14:14",
  }))
);
</script>

<style scoped></style>
