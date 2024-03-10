<script setup lang="ts">
definePageMeta({
    layout: 'slot',
    layoutTransition: {
        name: 'layout',
    },
})

const columns = [
    {
        key: 'SBD',
        label: 'Số báo danh',
        class: 'w-[120px]',
    },
    {
        key: 'NAME',
        label: 'Tên học sinh',
        sortable: true,
        class: 'w-[200px]',
    },
    {
        key: 'EMAIL',
        label: 'Email',
        sortable: true,
        class: 'w-[130px]',
    },
    {
        key: 'SCHOOL',
        label: 'Trường',
        sortable: true,
        class: 'w-[120px]',
    },
    {
        key: 'NQH',
        label: 'Đang học tại NQH',
        sortable: true,
        class: 'w-[120px]',
    },
]

const state = reactive({
    code: undefined,
    class: undefined,
    types: undefined,
    file: undefined,
    loading: false,
    excercies: [] as any,
})
const page = ref(1)
const pageCount = 20
const toast = useToast()

const rows = computed(() => {
    const data = state.excercies?.slice(
        (page.value - 1) * pageCount,
        page.value * pageCount
    )
    return data
})
const getAll = () => {
    state.loading = true
    $fetch('/api/student/all', {
        method: 'POST',
    })
        .then((data) => {
            state.excercies = data
        })
        .catch((e) => {
            toast.add({
                title: 'Không có dữ liệu',
                timeout: 3000,
                icon: 'i-heroicons-exclamation-triangle',
                color: 'red',
            })
        })
        .finally(() => {
            state.loading = false
        })
}
onMounted(() => {
    getAll()
})
const searchStudent = (event: any) => {

    state.loading = true
    $fetch('/api/student/search', {
        method: 'POST',
        body: {
            search: event.target.value,
        },
    })
        .then((data) => {
            state.excercies = data
        })
        .catch((e) => {
            toast.add({
                title: 'Không có dữ liệu',
                timeout: 3000,
                icon: 'i-heroicons-exclamation-triangle',
                color: 'red',
            })
        })
        .finally(() => {
            state.loading = false
        })
}
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
                    placeholder="Tìm kiếm số báo danh..."
                    @change="searchStudent"
                />

                <USelect
                    :options="['Toán', 'Lý', 'Hóa']"
                    placeholder="Lớp"
                    class="w-40"
                />
            </div>
            <!-- <div class="overflow-auto h-full w-full flex-1"> -->
            <UTable
                :loading="state.loading"
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
