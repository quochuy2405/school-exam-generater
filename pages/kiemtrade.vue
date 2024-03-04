<script setup lang="ts">
import { create, findAll } from '@/composables/firebase/base'
import { db } from '@/composables/firebase/config'
import { collection } from 'firebase/firestore'
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
        key: 'Đường dẫn',
        label: 'Đường dẫn',
    },
]
const toast = useToast()
const state = reactive({
    code: undefined,

    excercies: [] as any,
})
const page = ref(1)
const pageCount = 20

const rows = computed(() => {
    const data = state.excercies?.slice(
        (page.value - 1) * pageCount,
        page.value * pageCount,
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
    const topicsRef = collection(db, 'topics')
    findAll(topicsRef, [['code', event.data.code]]).then((data: any) => {
        if (data.length) state.excercies = Object.values(data[0].excercies)
    })
}
</script>

<template>
    <div class="flex h-full flex-col gap-3 w-full overflow-auto px-2 py-1">
        <UCard>
            <UForm
                :schema="schema"
                :state="state"
                :validate="validate"
                @submit="onSubmit"
                ><div class="grid grid-cols-2 lg:w-3/5 gap-3">
                    <div class="flex flex-col gap-2">
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
                </div>

                <div class="flex justify-end">
                    <UButton type="submit" class="h-fit w-fit px-2"
                        >Tìm kiếm bộ câu hỏi</UButton
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
