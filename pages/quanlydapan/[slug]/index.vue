<script setup lang="ts">
import { z } from 'zod';

definePageMeta({
    layout: 'slot',
    layoutTransition: {
        name: 'layout',
    },
})

const toast = useToast()
const navigation = useRouter()
const router = useRoute()

const columns = [
    {
        key: 'code',
        label: 'Mã đề',
        class: 'min-w-[80px]',
    },
    {
        key: 'subject',
        label: 'Môn Thi',
        sortable: true,
        class: 'min-w-[100px]',
    },
    {
        key: 'khoi',
        label: 'Khối',
        sortable: true,
        class: 'min-w-[100px]',
    },
    {
        key: 'de',
        label: 'Mã đề thực chiến',
        sortable: true,
        class: 'min-w-[60px]',
    },
    { label: 'Chỉnh sửa', key: 'actions' },
]
const items = (row: any) => [
    [
        {
            label: 'Edit',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: () => {
                navigation.push({
                    path: `/quanlydapan/${router.params.slug}/${row.code}/${row.khoi}/${row.de}`,
                })
            },
        },
    ],
]

const state = reactive({
    code: '',
    loading: false,
    de: '',
    khoi: '',
    exams: [] as any,
})

const page = ref(1)
const pageCount = 20

const rows = computed(() => {
    const data = state.exams?.slice((page.value - 1) * pageCount, page.value * pageCount)
    return data
})
const schema = z.object({
    code: z.string().min(3, 'Phải nhiều hơn 3 ký tự'),
    khoi: z.string({
        required_error: 'Vui lòng chọn khối',
    }),
    de: z.string({
        required_error: 'Vui lòng chọn mã đề thực chiến',
    }),
})
const validate = (state: any): any[] => {
    const errors = []
    if (!state.code) {
        errors.push({ path: 'code', message: 'Vui lòng nhập mã đề' })
    }
    if (!state.khoi) {
        errors.push({ path: 'khoi', message: 'Vui lòng chọn khối' })
    }
    if (!state.de) {
        errors.push({ path: 'de', message: 'Vui lòng chọn mã đề thực chiến' })
    }

    return errors
}

async function onSubmit(event: any) {
    // Do something with data
    state.loading = true
    const body = {
        code: event.data.code,
        de: event.data.de,
        khoi: event.data.khoi,
        mon: router.params.slug,
    }
    $fetch('/api/exam/find', { method: 'POST', body })
        .then((response: any) => {
            state.exams = response
        })
        .catch(() => {
            toast.add({
                title: 'Không tìm thấy',
                timeout: 3000,
                icon: 'i-heroicons-exclamation-triangle',
                color: 'orange',
            })
            state.exams = undefined
        })
        .finally(() => {
            state.loading = false
        })
}
const getAll = () => {
    state.code = ''
    state.de = ''
    const body = {
        mon: router.params.slug,
    }

    $fetch('/api/exam/all', { method: 'POST', body })
        .then((response: any) => {
            state.exams = response
        })
        .catch(() => {
            toast.add({
                title: 'Không tìm thấy',
                timeout: 3000,
                icon: 'i-heroicons-exclamation-triangle',
                color: 'orange',
            })
            state.exams = undefined
        })
}
onMounted(() => {
    getAll()
})
</script>

<template>
    <div class="flex h-full flex-col gap-3 w-full overflow-auto px-2 py-1">
        <UCard>
            <UForm :schema="schema" :state="state" :validate="validate" @submit="onSubmit"
                ><div class="grid grid-cols-2 lg:w-3/5 gap-3">
                    <div class="flex gap-2">
                        <UFormGroup label="Mã đề" name="code" eager-validation required>
                            <UInput
                                class="min-w-[140px]"
                                v-model="state.code"
                                placeholder="Nhập mã đề"
                            />
                        </UFormGroup>
                        <UFormGroup label="Khối" name="khoi" eager-validation required>
                            <USelect
                                class="min-w-[160px]"
                                v-model="state.khoi"
                                placeholder="Chọn khối"
                                :options="[9, 12]"
                            />
                        </UFormGroup>
                        <UFormGroup label="Mã đề thực chiến (IN HOA)"  name="de" eager-validation required>
                            <UInput
                                class="min-w-[160px] w-[200px]"
                                v-model="state.de"
                                placeholder="Mã đề thực chiến"
                            
                            />
                        </UFormGroup>
                        <UButton @click="getAll" class="h-fit mt-6 w-fit px-2">Bỏ lọc</UButton>
                        <UButton
                            type="submit"
                            class="h-fit mt-6 w-fit px-2"
                            :loading="state.loading"
                            >Tìm kiếm bộ câu hỏi</UButton
                        >
                    </div>
                </div>

                <div class="flex justify-end gap-4">
                    <UButton
                        :to="`/quanlydapan/${router.params?.slug}/nhaplieu`"
                        type="button"
                        color="black"
                        variant="solid"
                        class="h-fit w-fit px-2"
                        >Tạo bộ câu hỏi mới</UButton
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
                :loading="state.loading"
            >
                <template #actions-data="{ row }">
                    <UDropdown :items="items(row)">
                        <UButton
                            color="gray"
                            variant="ghost"
                            icon="i-heroicons-ellipsis-horizontal-20-solid"
                        />
                    </UDropdown>
                </template>

                <template #subject-data="{ row }">
                    <p class="capitalize">{{ row.subject }}</p>
                </template>
            </UTable>
            <!-- </div> -->

            <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
                <UPagination v-model="page" :page-count="pageCount" :total="state.exams?.length" />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
