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
        class: 'min-w-[100px]',
    },
    {
        key: 'Dạng',
        label: 'Dạng',
        sortable: true,
        class: 'min-w-[60px]',
    },
    {
        key: 'Đáp Án',
        label: 'Đáp Án',
        sortable: true,
        class: 'w-[100px]',
    },
    {
        key: 'Giải pháp',
        label: 'Giải pháp',
        class: 'w-[200px]',
    },
    {
        key: 'Đường Dẫn',
        label: 'Đường dẫn',
    },
    { label: 'Chỉnh sửa', key: 'actions' },
]
const items = (row: any) => [
    [
        {
            label: 'Edit',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: () => {
                const editData = {
                    question: row['Câu Hỏi'],
                    type: row['Dạng'],
                    solve: row['Giải pháp'],
                    answer: row['Đáp Án'],
                    link: row['Đường Dẫn'],
                    stt: row['STT'],
                }

                isEdit.value = true

                Object.assign(formEdit, editData)
            },
        },
    ],
]
const toast = useToast()
const router = useRoute()
const navigation = useRouter()

const state = reactive({
    code: undefined,
    loading: false,
    type: undefined,
    excercies: [] as any,
})
const formEdit = reactive({
    answer: undefined,
    stt: undefined,
    type: undefined,
    solve: undefined,
    question: undefined,
    link: undefined,
})
const isEdit = ref(false)
const page = ref(1)
const pageCount = 20

const rows = computed(() => {
    const data = state.excercies?.slice((page.value - 1) * pageCount, page.value * pageCount)
    return data
})

watchEffect(() => {
    state.loading = true
    const body = {
        code: router.params.id,
        type: router.params.type,
        subject: router.params.slug,
    }

    $fetch('/api/exam/find', { method: 'POST', body })
        .then((response: any) => {
            state.excercies = Object.values(response[0].excercies)
        })
        .catch(() => {
            toast.add({
                title: 'Không tìm thấy',
                timeout: 3000,
                icon: 'i-heroicons-exclamation-triangle',
                color: 'orange',
            })
            state.excercies = undefined
        })
        .finally(() => {
            state.loading = false
        })
})

async function onUpdate(event: any) {
    // Do something with data
    state.loading = true

    const body = {
        'Đáp Án': event.data.answer,
        Dạng: event.data.type,
        'Giải pháp': event.data.solve,
        'Câu Hỏi': event.data.question,
        'Đường Dẫn': event.data.link,
    }
    const row = state.excercies.find((item: any) => item['STT'] === event.data.stt)
    Object.assign(row, body)
    $fetch('/api/exam/update', { method: 'POST', body: state })
        .then((response: any) => {
            toast.add({ title: 'Đã cập nhật', timeout: 3000 })
            isEdit.value = false
            Object.assign(formEdit, {})
        })
        .catch(() => {
            toast.add({ title: 'Không tìm thấy', timeout: 3000 })
        })
        .finally(() => {
            state.loading = false
        })
}

async function onDelete(event: any) {
    // Do something with data
    state.loading = true

    const body = {
        code: router.params.id,
        type: router.params.type,
        subject: router.params.slug,
    }

    $fetch('/api/exam/delete', { method: 'POST', body })
        .then((response: any) => {
            navigation.push({ path: `/quanlydapan/${router.params.slug}` })
        })
        .catch(() => {
            toast.add({ title: 'Không thể xóa', timeout: 3000 })
        })
        .finally(() => {
            state.loading = false
        })
}
</script>

<template>
    <div class="flex h-full flex-col gap-3 w-full overflow-auto px-2 py-1">
        <UCard class="flex justify-end">
            <UPopover>
                <UButton color="red" class="h-fit w-fit px-2" :loading="state.loading"
                    >Xóa bộ đề này</UButton
                >
                <template #panel>
                    <div class="p-4 flex justify-end flex-col items-end gap-2">
                        <UCard>Bạn có xác muốn xóa</UCard>
                        <UButton
                            @click="onDelete"
                            color="red"
                            class="h-fit w-fit px-2"
                            :loading="state.loading"
                            >Xóa</UButton
                        >
                    </div>
                </template>
            </UPopover>
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
            </UTable>
            <!-- </div> -->

            <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
                <UPagination
                    v-model="page"
                    :page-count="pageCount"
                    :total="state.excercies?.length"
                />
            </div>
        </div>
        <UModal v-model="isEdit" prevent-close>
            <UCard>
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
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
                            label="STT"
                            name="stt"
                            eager-validation
                            required
                            class="w-full"
                            aria-readonly="true"
                        >
                            <UInput v-model="formEdit.stt" placeholder="STT" :disabled="true" />
                        </UFormGroup>
                        <UFormGroup
                            label="Câu hỏi"
                            name="question"
                            eager-validation
                            required
                            class="w-full"
                        >
                            <UTextarea v-model="formEdit.question" placeholder="Nhập câu hỏi..." />
                        </UFormGroup>
                        <UFormGroup
                            label="Đáp án"
                            name="answer"
                            eager-validation
                            required
                            class="w-full"
                        >
                            <USelect
                                v-model="formEdit.answer"
                                placeholder="Lựa chọn..."
                                :options="['A', 'B', 'C', 'D']"
                            />
                        </UFormGroup>
                        <UFormGroup
                            label="Lời giải gợi ý"
                            name="solve"
                            eager-validation
                            required
                            class="w-full"
                        >
                            <UTextarea
                                v-model="formEdit.solve"
                                placeholder="Nhập lời giai gợi ý..."
                            />
                        </UFormGroup>
                        <UFormGroup
                            label="Đường dẫn"
                            name="link"
                            eager-validation
                            required
                            class="w-full"
                        >
                            <UInput
                                v-model="formEdit.link"
                                placeholder="Nhập đường dẫn lời giải..."
                            />
                        </UFormGroup>
                        <UButton type="submit">Lưu đáp án</UButton>
                    </div>
                </UForm>
            </UCard>
        </UModal>
    </div>
</template>

<style scoped></style>
