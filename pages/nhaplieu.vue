<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
    layout: 'slot',
    layoutTransition: {
        name: 'layout',
    },
})

const columns = [
    {
        key: 'STT',
        label: 'STT',
        class: 'w-[60px]',
    },
    {
        key: 'Câu Hỏi',
        label: 'Câu Hỏi',
        sortable: true,
        class: 'w-[200px]',
    },
    {
        key: 'Dạng',
        label: 'Dạng',
        sortable: true,
        class: 'w-[150px]',
    },
    {
        key: 'Đáp Án',
        label: 'Đáp Án',
        sortable: true,
        class: 'w-[200px]',
    },
    {
        key: 'Giải pháp',
        label: 'Giải pháp',
        class: 'w-[300px]',
    },
    {
        key: 'Đường dẫn',
        label: 'Đường dẫn',
    },
]
const toast = useToast()
const state = reactive({
    code: undefined,
    class: undefined,
    types: undefined,
    file: undefined,
    excercies: [] as any,
})
const page = ref(1)
const pageCount = 20

const handleChangeFile = (event: any) => {
    const reader = new FileReader()
    const file = event.target.files[0]
    reader.onload = (e: any) => {
        const csvText = e.target.result
        const json = csvToJson(csvText) as any
        state.excercies = [...json]
    }
    reader.readAsText(file)
    state.file = file
}

const rows = computed(() => {
    const data = state.excercies?.slice(
        (page.value - 1) * pageCount,
        page.value * pageCount
    )
    return data
})
const schema = z.object({
    code: z.string().min(3, 'Phải nhiều hơn 3 ký tự'),
})
const validate = (state: any): any[] => {
    const errors = []
    if (!state.code) {
        errors.push({ path: 'code', message: 'Vui lòng nhập mã đề' })
    }

    return errors
}

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

    const dataCreate = {
        code: event.data.code,
        excercies: { ...event.data.excercies },
    }
    $fetch('/api/exam/add', {
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
}
</script>

<template>
    <div
        class="flex h-full flex-col gap-3 w-full overflow-auto px-2 py-1 overflow-hidden"
    >
        <UCard>
            <UForm
                :schema="schema"
                :state="state"
                :validate="validate"
                @submit="onSubmit"
                class="flex flex-col gap-2"
                ><div class="grid grid-cols-2 lg:w-3/5 gap-3">
                    <div class="flex flex-col gap-2">
                        <!-- <UFormGroup label="Lớp" name="class" eager-validation>
                            <USelect
                                v-model="state.class"
                                placeholder="Lựa chọn lớp"
                                :options="classes"
                            />
                        </UFormGroup> -->
                        <UFormGroup
                            label="Mã đề"
                            name="code"
                            eager-validation
                            required
                        >
                            <UInput
                                v-model="state.code"
                                placeholder="Nhập mã đề"
                            />
                        </UFormGroup>
                    </div>
                    <div class="flex flex-col gap-2">
                        <!-- <UFormGroup
                            label="Loại đề"
                            name="class"
                            eager-validation
                        >
                            <USelect
                                v-model="state.types"
                                placeholder="Lựa chọn loại đề"
                                :options="types"
                            />
                        </UFormGroup> -->
                        <UFormGroup
                            label="Tải lên file csv"
                            name="file"
                            eager-validation
                        >
                            <input
                                :model-value="state.file"
                                @change="handleChangeFile"
                                type="file"
                                accept="*"
                                size="sm"
                                class="block w-full border rounded-md border-gray-300 text-sm text-gray-4000 file:h-full h-8 file:rounded-s-md file:border-0 file:text-sm file:font-semibold file:bg-[#22c55e] file:text-white hover:file:bg-[#16a34a]"
                            />
                        </UFormGroup>
                    </div>
                </div>

                <div class="flex justify-end">
                    <UButton type="submit" class="h-fit w-fit px-2"
                        >Thêm bộ câu hỏi</UButton
                    >
                </div>
            </UForm>
        </UCard>

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
