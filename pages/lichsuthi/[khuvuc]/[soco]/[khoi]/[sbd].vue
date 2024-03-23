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
        key: 'MADE',
        label: 'Mã đề',
        sortable: true,
        class: 'w-[200px]',
    },
    {
        key: 'NAME',
        label: 'Tên học sinh',
        sortable: true,
        class: 'w-[200px]',
    },
    {
        key: 'MON',
        label: 'Môn',
        sortable: true,
        class: 'w-[200px]',
    },
    {
        key: 'DOT',
        label: 'Đợt',
        sortable: true,
        class: 'w-[200px]',
    },
    {
        key: 'SCORE',
        label: 'Điểm',
        sortable: true,
        class: 'w-[200px]',
    },
    {
        key: 'NGAY',
        label: 'Ngày',
        sortable: true,
        class: 'w-[200px]',
    },
]

const router = useRoute()
const nav = useRouter()

const state = reactive({
    code: undefined,

    histories: [] as any,
})
const page = ref(1)
const pageCount = 20

const rows = computed(() => {
    const data = state.histories?.slice((page.value - 1) * pageCount, page.value * pageCount)
    return data
})
const linkBack = computed(() => {
  const link = `/hocvien?area='${router.params.khuvuc}'&lop='${rows.value?.[0]?.['DOT']}'`
    return link
})
const loadHistory = () => {
    $fetch('/api/history/find', {
        method: 'POST',
        body: {
            SBD: router.params.sbd,
            KHUVUC: router.params.khuvuc,
            COSO: router.params.coso,
            KHOI: router.params.khoi,
        },
    })
        .then((data) => {
            state.histories = data
        })
        .catch(() => {
            state.histories = []
        })
}
onMounted(() => loadHistory())
</script>

<template>
    <div class="flex h-full flex-col gap-3 w-full overflow-auto px-2 py-1">
        <div
            class="w-full flex-1 flex flex-col h-full bg-white rounded-md shadow-sm border overflow-hidden"
        >
            <UButton class="w-fit m-4" @click="()=> nav.push(linkBack)">Quay lại</UButton>
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
            >
            </UTable>
            <!-- </div> -->

            <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
                <UPagination
                    v-model="page"
                    :page-count="pageCount"
                    :total="state.histories?.length"
                />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
