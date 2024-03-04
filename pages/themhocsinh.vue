<script setup lang="ts">
import { z } from 'zod'

definePageMeta({
    layout: 'slot',
    layoutTransition: {
        name: 'layout',
    },
})

const classes = ['Lớp 1', 'Lớp 2', 'Lớp 3']

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
]
const schema = z.object({
    code: z.string().min(10, 'Must be at least 10 characters'),
})

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
        page.value * pageCount,
    )
    return data
})
</script>

<template>
    <div class="flex h-full flex-col gap-3 w-full overflow-auto px-2 py-1">
        <UCard>
            <UForm
                :schema="schema"
                :state="state"
                class="grid grid-cols-2 lg:w-3/5 gap-3"
            >
                <div class="flex flex-col gap-2">
                    <UFormGroup
                        label="Mã học sinh"
                        name="class"
                        eager-validation
                    >
                        <UInput
                            v-model="state.code"
                            placeholder="Nhập mã học sinh"
                        />
                    </UFormGroup>
                    <UFormGroup
                        label="Tên học sinh"
                        name="code"
                        eager-validation
                    >
                        <UInput
                            v-model="state.code"
                            placeholder="Nhập tên học sinh"
                        />
                    </UFormGroup>
                </div>
                <div class="flex flex-col gap-2">
                    <UFormGroup
                        label="Email học sinh"
                        name="file"
                        eager-validation
                    >
                        <UInput
                            v-model="state.code"
                            placeholder="Nhập email học sinh"
                        />
                    </UFormGroup>
                    <UFormGroup label="Lớp" name="class" eager-validation>
                        <USelect
                            v-model="state.class"
                            placeholder="Lựa chọn lớp"
                            :options="classes"
                        />
                    </UFormGroup>
                </div>
            </UForm>
        </UCard>
        <h1 class="font-medium">Hoặc</h1>
        <div class="flex justify-between items-end">
            <UFormGroup
                label="Tải lên file csv"
                name="file"
                class="w-fit"
                eager-validation
            >
                <UInput
                    :model-value="state.file"
                    @change="handleChangeFile"
                    type="file"
                    size="sm"
                />
            </UFormGroup>
            <UButton class="h-fit">Thêm tất cả học sinh</UButton>
        </div>
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
