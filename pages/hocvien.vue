<script setup lang="ts">
import { coso, khuvuc, thucchien } from '@/constants/options'

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
        class: 'w-[100px]',
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
        class: 'w-[80px]',
    },
    {
        key: 'SCHOOL',
        label: 'Trường',
        sortable: true,
        class: 'w-[120px]',
    },
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
        key: 'NQH',
        label: 'Đang học tại NQH',
        sortable: true,
        class: 'w-[120px]',
    },
    {
        key: 'sua',
        label: 'Chỉnh sửa',
        class: 'w-[100px]',
    },
    {
        key: 'actions',
        label: 'Lịch sử điểm',
        class: 'w-[150px]',
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
const router = useRouter()
const params = useRoute()
const form = reactive({
    lop: undefined,
    area: undefined,
    coso: undefined,
    khoi: undefined,
})
const formEdit = reactive({
    SBD: undefined,
    NAME: undefined,
    EMAIL: undefined,
    SCHOOL: undefined,
    COSO: undefined,
    KHOI: undefined,
    AREA: undefined,
    CLASS: undefined,
    NQH: 0,
})
const isEdit = ref(false)
const rows = computed(() => {
    const data = state.excercies?.slice((page.value - 1) * pageCount, page.value * pageCount)
    return data
})
const getByClass = (lop?: string, area?: string, coso?: string, khoi?: string) => {
    state.loading = true
    $fetch('/api/student/class', {
        method: 'POST',
        body: {
            CLASS: lop,
            AREA: area,
            COSO: coso,
            KHOI: khoi,
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
            state.excercies = []
        })
        .finally(() => {
            state.loading = false
        })
}

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
            console.log('event', event)
            getByClass(event.data.CLASS, event.data.AERA, event.data.COSO, event.data.KHOI)
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
            getByClass(form.lop, form.area, form.coso, form.khoi)
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
                    COSO: row['COSO'],
                    KHOI: row['KHOI'],
                    CLASS: row['CLASS'],
                    AREA: row['AREA'],
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
                onDelete(row['SBD'])
            },
        },
    ],
]
watchEffect(() => {
    const search = params.query
    const data = {
        lop: form.lop || search.lop,
        area: form.area || search.area,
        coso: form.coso || search.coso,
        khoi: form.khoi || search.khoi,
    }

    Object.assign(form, { ...data })

    router.push({
        path: '/hocvien',
        query: data,
    })

    if (search.lop && search.area && search.coso && search.khoi)
        getByClass(search.lop, search.area, search.coso, search.khoi)
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
                    placeholder="Tìm kiếm số báo danh..."
                    @change="searchStudent"
                />
                <div class="flex gap-3">
                    <USelect
                        :options="khuvuc"
                        placeholder="Khu vực"
                        class="w-40"
                        v-model="form.area"
                    />
                    <USelect :options="coso" placeholder="Cơ sở" class="w-40" v-model="form.coso" />
                    <USelect
                        :options="['9', '12']"
                        placeholder="Khối"
                        class="w-40"
                        v-model="form.khoi"
                    />
                    <USelect
                        :options="thucchien"
                        placeholder="Lớp"
                        class="w-40"
                        v-model="form.lop"
                    />
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
                <template #NQH-data="{ row }">
                    <UCheckbox :model-value="!!row['NQH']" disabled></UCheckbox>
                </template>
                <template #actions-data="{ row }">
                    <UButton
                        :to="`/lichsuthi/${row['AREA']}/${row['COSO']}/${row['KHOI']}/${row['SBD']}`"
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
                                Chỉnh sửa học viên
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
                                label="Khu vực"
                                name="AREA"
                                eager-validation
                                required
                                class="w-full"
                            >
                                <USelect
                                    :options="khuvuc"
                                    placeholder="Khu vực"
                                    class="w-full"
                                    v-model="formEdit.AREA"
                                />
                            </UFormGroup>
                            <UFormGroup
                                label="Cơ sở"
                                name="COSO"
                                eager-validation
                                required
                                class="w-full"
                            >
                                <USelect
                                    :options="coso"
                                    placeholder="Cơ sở"
                                    class="w-full"
                                    v-model="formEdit.COSO"
                                />
                            </UFormGroup>
                            <UFormGroup
                                label="Khối"
                                name="KHOI"
                                eager-validation
                                required
                                class="w-full"
                            >
                                <USelect
                                    :options="[9, 12]"
                                    placeholder="Khối"
                                    class="w-full"
                                    v-model="formEdit.KHOI"
                                />
                            </UFormGroup>
                            <UFormGroup
                                label="Lớp"
                                name="CLASS"
                                eager-validation
                                required
                                class="w-full"
                            >
                                <USelect
                                    :options="thucchien"
                                    placeholder="Lớp"
                                    class="w-full"
                                    v-model="formEdit.CLASS"
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
                                label="Email"
                                name="EMAIL"
                                eager-validation
                                required
                                class="w-full"
                            >
                                <UTextarea
                                    v-model="formEdit.EMAIL"
                                    placeholder="Nhập email học viên."
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
