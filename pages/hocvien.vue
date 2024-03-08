<script setup lang="ts">
definePageMeta({
    layout: 'slot',
    layoutTransition: {
        name: 'layout',
    },
})

const columns = [
    {
        key: 'Mã học sinh',
        label: 'Mã học sinh',
        class: 'w-[120px]',
    },
    {
        key: 'Tên học sinh',
        label: 'Tên học sinh',
        sortable: true,
        class: 'min-w-[100px]',
    },
    {
        key: 'Email',
        label: 'Email',
        sortable: true,
        class: 'min-w-[60px]',
    },
    {
        key: 'Lớp',
        label: 'Lớp',
        sortable: true,
        class: 'w-[120px]',
    },
    {
        key: 'Điểm',
        label: 'Điểm',
    },
]

const state = reactive({
    code: undefined,
    class: undefined,
    types: undefined,
    file: undefined,
    excercies: [] as any,
})
const page = ref(1)
const pageCount = 20

const rows = computed(() => {
    const data = state.excercies?.slice(
        (page.value - 1) * pageCount,
        page.value * pageCount
    )
    return data
})
</script>

<template>
    <div class="flex h-full flex-col gap-3 w-full overflow-auto px-2 py-1">
        <UButton to="/themhocsinh" class="w-fit">Thêm học sinh mới</UButton>
        <div
            class="w-full flex-1 flex flex-col h-full bg-white rounded-md shadow-sm border overflow-hidden"
        >
            <div class="flex items-center justify-between gap-3 px-4 py-3">
                <UInput
                    icon="i-heroicons-magnifying-glass-20-solid"
                    placeholder="Search..."
                />

                <USelectMenu multiple placeholder="Status" class="w-40" />
            </div>
            <!-- <div class="overflow-auto h-full w-full flex-1"> -->
            <UTable
                sort-asc-icon="i-heroicons-arrow-up-20-solid"
                sort-desc-icon="i-heroicons-arrow-down-20-solid"
                class="relative"
                :sort-button="{
                    icon: 'i-heroicons-sparkles-20-solid',
                    color: 'primary',
                    variant: 'outline',
                    size: '2xs',
                    square: false,
                }"
                :columns="columns"
                :rows="rows"
            />
            <!-- </div> -->

            <div
                class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
            >
                <UPagination
                    v-model="page"
                    :page-count="pageCount"
                    :total="state.excercies?.length"
                />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
