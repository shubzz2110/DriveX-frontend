<template>
  <div class="flex flex-col w-full h-full overflow-hidden p-5 gap-y-10">
    <h1 class="page-heading">My Drive</h1>
    <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between w-full h-max gap-5">
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
</script>

<style scoped></style>
