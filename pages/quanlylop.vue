<script setup lang="ts">
import { coso, khuvuc } from '@/constants/options'

definePageMeta({
    layout: 'slot',
    layoutTransition: {
        name: 'layout',
    },
})

const columns = [
    {
        key: 'CLASS',
        label: 'Lớp',
        sortable: true,
        class: 'w-[120px]',
    },
    {
        key: 'KHOI',
        label: 'Khối',
        sortable: true,
        class: 'w-[120px]',
    },
    {
        key: 'COSO',
        label: 'Cơ sở',
        sortable: true,
        class: 'w-[120px]',
    },
    {
        key: 'AREA',
        label: 'Khu vực',
        sortable: true,
        class: 'w-[120px]',
    },

    {
        key: 'sua',
        label: 'Chỉnh sửa',
        class: 'w-[120px]',
    },
]
const router = useRouter()
const params = useRoute()
const state = reactive({
    code: undefined,
    class: undefined,
    loading: false,
    source: [],
})
const page = ref(1)
const pageCount = 20
const toast = useToast()
const form = reactive({
    area: undefined,
    coso: undefined,
})

const isEdit = ref(false)

async function onDelete({ AREA, COSO, KHOI, CLASS }: any) {
    // Do something with data
    state.loading = true
    $fetch('/api/class/delete', {
        method: 'POST',
        body: {
            AREA,
            COSO,
            KHOI,
            CLASS,
        },
    })
        .then(() => {
            toast.add({ title: 'Đã xóa', timeout: 3000 })
            isEdit.value = false
            Object.assign(form, {})
            getClass({ COSO, AREA })
        })
        .catch(() => {
            toast.add({
                title: 'Không tìm thấy để xóa',
                timeout: 3000,
                icon: 'i-heroicons-exclamation-triangle',
                color: 'red',
            })
        })
        .finally(() => {
            state.loading = false
        })
}

const getClass = ({ COSO, AREA }: { COSO: string; AREA: string }) => {
    state.loading = true
    $fetch('/api/class/get', {
        method: 'POST',
        body: {
            AREA,
            COSO,
        },
    })
        .then((data) => {
            state.source = data
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
const items = (row: any) => [
    [
        {
            label: 'Xem danh sách lớp',
            icon: 'i-heroicons-eye-20-solid',
            click: () => {
                router.push({
                    path: '/hocvien',
                    query: {
                        area: row['AREA'],
                        coso: row['COSO'],
                        khoi: row['KHOI'],
                        lop: row['CLASS'],
                    },
                })
            },
        },
    ],
    [
        {
            label: 'Delete',
            icon: 'i-heroicons-trash-20-solid',
            click: () => {
                onDelete({
                    AREA: row['AREA'],
                    COSO: row['COSO'],
                    KHOI: row['KHOI'],
                    CLASS: row['CLASS'],
                })
            },
        },
    ],
]

watchEffect(() => {
    router.push({
        path: '/quanlylop',
        query: { area: form.area, coso: form.coso },
    })
})
watchEffect(() => {
    const search = params.query
    if (search.area && search.coso) getClass({ AREA: search.area, COSO: search.coso })
})
const rows = computed(() => {
    const data = state.source?.slice((page.value - 1) * pageCount, page.value * pageCount)
    return data
})
</script>

<template>
    <div class="flex h-full flex-col gap-3 w-full overflow-auto px-2 py-1">
        <div
            class="w-full flex-1 flex flex-col h-full bg-white rounded-md shadow-sm border overflow-hidden"
        >
            <div class="flex items-center justify-between gap-3 px-4 py-3">
                <div class="flex gap-3">
                    <USelect
                        :options="khuvuc"
                        placeholder="Khu vực"
                        class="w-40"
                        v-model="form.area"
                    />
                    <USelect :options="coso" placeholder="Cơ sở" class="w-40" v-model="form.coso" />
                </div>
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
            >
                <template #sua-data="{ row }">
                    <UDropdown :items="items(row)">
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-ellipsis-horizontal-20-solid"
                        />
                    </UDropdown>
                </template>
            </UTable>
            <!-- </div> -->

            <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
                <UPagination :total="0" v-model="page" :page-count="pageCount" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
