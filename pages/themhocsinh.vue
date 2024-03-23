<script setup lang="ts">
import { thucchien, khuvuc, coso, mon } from '@/constants/options'
import { z } from 'zod'

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

const toast = useToast()
const state = reactive({
    code: undefined,
    class: undefined,
    area: undefined,
    coso: undefined,
    khoi: undefined,
    mon: undefined,
    types: undefined,
    file: undefined,
    loading: false,
    students: [] as any,
})
const page = ref(1)
const pageCount = 20
const schema = z.object({
    class: z.string({
        required_error: 'Vui lòng chọn lớp',
    }),
    area: z.string({
        required_error: 'Vui lòng chọn khu vực',
    }),
    coso: z.string({
        required_error: 'Vui lòng chọn cơ sở',
    }),
    khoi: z.string({
        required_error: 'Vui lòng chọn khối',
    }),
    mon: z.string({
        required_error: 'Vui lòng chọn môn',
    }),
})

const handleChangeFile = (event: any) => {
    const reader = new FileReader()
    const file = event.target.files[0]
    reader.onload = (e: any) => {
        const csvText = e.target.result
        const json = csvToJson(csvText) as any
        state.students = [...json]
    }
    reader.readAsText(file)
    state.file = file
}

const rows = computed(() => {
    const data = state.students?.slice((page.value - 1) * pageCount, page.value * pageCount)
    return data
})

async function onSubmit(event: any) {
    // Do something with data

    if (!state.file) {
        toast.add({
            title: 'Bạn chưa tải file csv',
            timeout: 3000,
            icon: 'i-heroicons-exclamation-triangle',
            color: 'orange',
        })

        return
    }
    state.loading = true
    const dataCreate = state.students
        .filter((item: any) => item.SBD)
        .map((student: any) => ({
            ...student,
            CLASS: state.class,
            AREA: state.area,
            KHOI: state.khoi,
            COSO: state.coso,
            MON: state.mon,
        }))

    $fetch('/api/student/add', {
        method: 'POST',
        body: dataCreate,
    })
        .then(() => {
            toast.add({
                title: 'Đã tạo dữ liệu thành công',
                timeout: 3000,
                icon: 'i-heroicons-check-circle',
            })
        })
        .catch((e) => {
            if (e.response.status == 409) {
                toast.add({
                    title: 'Mã đề đã tồn tại',
                    timeout: 3000,
                    icon: 'i-heroicons-exclamation-triangle',
                    color: 'orange',
                })
            } else {
                toast.add({
                    title: 'Không tạo được',
                    timeout: 3000,
                    icon: 'i-heroicons-exclamation-triangle',
                    color: 'red',
                })
            }
        })
        .finally(() => {
            state.loading = false
        })
}
</script>

<template>
    <div class="flex h-full flex-col gap-3 w-full overflow-auto px-2 py-1">
        <UForm
            :state="state"
            :schema="schema"
            @submit="onSubmit"
            class="flex flex-col justify-start gap-6 items-start"
        >
            <div class="flex justify-start gap-6 items-end">
                <UFormGroup label="Tải lên file csv" name="file" class="w-fit" eager-validation>
                    <input
                        :model-value="state.file"
                        @change="handleChangeFile"
                        type="file"
                        accept="*"
                        size="sm"
                        class="block w-full border rounded-md border-gray-300 text-sm text-gray-4000 file:h-full h-8 file:rounded-s-md file:border-0 file:text-sm file:font-semibold file:bg-[#22c55e] file:text-white hover:file:bg-[#16a34a]"
                    />
                </UFormGroup>
                <UFormGroup label="Khu vực đăng ký" name="area" eager-validation required>
                    <USelect
                        :options="khuvuc"
                        placeholder="Khu vực"
                        class="w-40"
                        v-model="state.area"
                    />
                </UFormGroup>

                <UFormGroup label="Cơ sở đăng ký" name="coso" eager-validation required>
                    <USelect
                        :options="coso"
                        placeholder="Cơ sở"
                        class="w-40"
                        v-model="state.coso"
                    />
                </UFormGroup>
            </div>
            <div class="flex gap-4">
                <UFormGroup label="Khối đăng ký" name="khoi" eager-validation required>
                    <USelect
                        :options="[9, 12]"
                        placeholder="Khối"
                        class="w-40"
                        v-model="state.khoi"
                    />
                </UFormGroup>
                <UFormGroup label="Lớp đăng ký" name="class" eager-validation required>
                    <USelect
                        :options="thucchien"
                        placeholder="Lớp"
                        class="w-40"
                        v-model="state.class"
                    />
                </UFormGroup>

                <UFormGroup label="Môn đăng ký" name="mon" eager-validation required>
                    <USelect :options="mon" placeholder="Môn" class="w-40" v-model="state.mon" />
                </UFormGroup>
                <UButton :loading="state.loading" type="submit" class="h-fit mt-6"
                    >Thêm tất cả học sinh</UButton
                >
            </div>
        </UForm>
        <div
            class="w-full flex-1 flex flex-col h-full bg-white rounded-md shadow-sm border overflow-hidden"
        >
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

            <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
                <UPagination
                    v-model="page"
                    :page-count="pageCount"
                    :total="state.students?.length"
                />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
