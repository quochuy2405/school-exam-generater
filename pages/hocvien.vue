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
    {
        key: 'sua',
        label: 'Chỉnh sửa',
        class: 'w-[120px]',
    },
    {
        key: 'actions',
        label: 'Lịch sử điểm',
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
const formEdit = reactive({
    SBD: undefined,
    NAME: undefined,
    EMAIL: undefined,
    SCHOOL: undefined,
    NQH: 0,
})
const isEdit = ref(false)
const rows = computed(() => {
    const data = state.excercies?.slice((page.value - 1) * pageCount, page.value * pageCount)
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

async function onUpdate(event: any) {
    // Do something with data
    state.loading = true
    $fetch('/api/student/update', { method: 'POST', body: event.data })
        .then((response: any) => {
            toast.add({ title: 'Đã cập nhật', timeout: 3000 })
            isEdit.value = false
            Object.assign(formEdit, {})
            getAll()
        })
        .catch(() => {
            toast.add({ title: 'Không tìm thấy', timeout: 3000 })
        })
        .finally(() => {
            state.loading = false
        })
}

async function onDelete(SBD: any) {
    // Do something with data
    state.loading = true
    $fetch('/api/student/delete', {
        method: 'POST',
        body: {
            SBD,
        },
    })
        .then((response: any) => {
            toast.add({ title: 'Đã xóa', timeout: 3000 })
            isEdit.value = false
            Object.assign(formEdit, {})
            getAll()
        })
        .catch(() => {
            toast.add({ title: 'Không tìm thấy', timeout: 3000 })
        })
        .finally(() => {
            state.loading = false
        })
}

const items = (row: any) => [
    [
        {
            label: 'Edit',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: () => {
                const editData = {
                    SBD: row['SBD'],
                    NAME: row['NAME'],
                    EMAIL: row['EMAIL'],
                    SCHOOL: row['SCHOOL'],
                    NQH: row['NQH'],
                }
                isEdit.value = true

                Object.assign(formEdit, editData)
            },
        },
    ],
    [
        {
            label: 'Delete',
            icon: 'i-heroicons-trash-20-solid',
            click: () => {
                console.log('row', row['SBD'])
                onDelete(row['SBD'])
            },
        },
    ],
]
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

                <!-- <USelect :options="['Toán', 'Lý', 'Hóa']" placeholder="Lớp" class="w-40" /> -->
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
                <template #NQH-data="{ row }">
                    <UCheckbox :model-value="!!row['NQH']" disabled></UCheckbox>
                </template>
                <template #actions-data="{ row }">
                    <UButton
                        :to="`/lichsuthi/${row['SBD']}`"
                        color="primary"
                        label="Xem lịch sử điểm"
                    />
                </template>
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
                <UPagination
                    v-model="page"
                    :page-count="pageCount"
                    :total="state.excercies?.length"
                />
            </div>

            <UModal v-model="isEdit" prevent-close>
                <UCard>
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h3
                                class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
                            >
                                Chỉnh sửa đáp án
                            </h3>
                            <UButton
                                color="gray"
                                variant="ghost"
                                icon="i-heroicons-x-mark-20-solid"
                                class="-my-1"
                                @click="isEdit = false"
                            />
                        </div>
                    </template>
                    <UForm :state="formEdit" class="p-4" @submit="onUpdate">
                        <div class="flex items-center flex-col justify-between gap-3 px-4 py-3">
                            <UFormGroup
                                label="SBD"
                                name="Số báo danh"
                                eager-validation
                                required
                                class="w-full"
                                aria-readonly="true"
                            >
                                <UInput v-model="formEdit.SBD" placeholder="SBD" :disabled="true" />
                            </UFormGroup>
                            <UFormGroup
                                label="Họ và tên"
                                name="NAME"
                                eager-validation
                                required
                                class="w-full"
                            >
                                <UTextarea
                                    v-model="formEdit.NAME"
                                    placeholder="Nhập tên học sinh."
                                />
                            </UFormGroup>
                            <UFormGroup
                                label="Trường"
                                name="SCHOOL"
                                eager-validation
                                required
                                class="w-full"
                            >
                                <UInput v-model="formEdit.SCHOOL" placeholder="Trường học" />
                            </UFormGroup>
                            <UFormGroup
                                label="EMAIL"
                                name="EMAIL"
                                eager-validation
                                required
                                class="w-full"
                            >
                                <UTextarea
                                    v-model="formEdit.EMAIL"
                                    placeholder="Nhập lời giai gợi ý..."
                                />
                            </UFormGroup>
                            <UFormGroup
                                label="Học tại NQH?"
                                name="NQH"
                                eager-validation
                                required
                                class="w-full"
                            >
                                <UCheckbox
                                    :model-value="!!formEdit.NQH"
                                    @change="(e) => (formEdit.NQH = e.target.checked ? 1 : 0)"
                                />
                            </UFormGroup>
                            <UButton type="submit">Lưu lại</UButton>
                        </div>
                    </UForm>
                </UCard>
            </UModal>
        </div>
    </div>
</template>

<style scoped></style>
