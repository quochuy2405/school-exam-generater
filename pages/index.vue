<script setup lang="ts">
import { studentColumns } from '@/constants/student'
import { generateContent, readLinesFromCSV } from '@/utils/csvToJson'
import type { IFormData } from '../types'

definePageMeta({
    layout: 'slot',
    layoutTransition: {
        name: 'layout',
    },
})

const { $pdfMake } = useNuxtApp()
const toast = useToast()
const successMessage = ref<string | null>(null)
const isOpen = ref(false)
const state = reactive({
    class: undefined,
    types: undefined,
    file: undefined,
    emailtest: '',
    columns: [] as any,
    excercies: [] as any,
    students: [] as any,
    studentActive: undefined as any,
    answer: [] as any,
    pdf: [] as any,
    loading: false,
})
const page = ref(1)
const pageCount = 10

const handleChangeFile = (event: any) => {
    const reader = new FileReader()
    const file = event.target.files[0]
    reader.onload = (e: any) => {
        const csvText = e.target.result
        const startLineIndex = 0 // Bắt đầu từ dòng 0

        const { jsonData, header } = readLinesFromCSV(csvText, startLineIndex)
        const colsAdding = header
            .filter((item) => !!Number(item))
            .map((item) => ({
                key: item,
                label: `Câu ${item}`,
                class: 'w-[60px]',
            }))
        state.columns = [...studentColumns, ...colsAdding]
        state.excercies = [...jsonData]
        state.studentActive = state.excercies[0]

        state.students = state.excercies.map((item: any) => {
            return {
                label: `${item['Họ và Tên']} (${item['Số Báo Danh']}) - ${item['Mã đề']}`,
                content: `${item['Họ và Tên']} (${item['Số Báo Danh']}) - ${item['Mã đề']}`,
                value: item,
                slot: 'pdf',
            }
        })
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

const loadPdf = async () => {
    const pdfMaker = $pdfMake as any
    pdfMaker.tableLayouts = {
        custom: {
            fillColor: function (rowIndex: number) {
                return rowIndex % 2 !== 0 ? '#00000' : null
            },
            hLineColor: '#00000',
            vLineColor: '#00000',
            paddingLeft: function () {
                return 10
            },
            paddingRight: function () {
                return 10
            },
        },
    }

    // playground requires you to assign document definition to a variable called dd
    const answer = state.studentActive.incorrerAnswer.map((item: any) => ({
        question: `${item['Câu Hỏi']} - ${item['Giải pháp']}`,
        link: item['Đường Dẫn'],
    }))

    const filename = `${state.studentActive['Họ và Tên']}(${state.studentActive['Số Báo Danh']})-${state.studentActive['Mã đề']}.pdf`
    const mark = caculatorMark()

    const content = generateContent(state.studentActive, answer, mark)
    pdfMaker.createPdf(content).getDataUrl((base64Data: string) => {
        base64ToPDF(
            base64Data.replace('data:application/pdf;base64,', ''),
            filename
        )
    })
}

const dowloadPdf = async () => {
    const pdfMaker = $pdfMake as any
    pdfMaker.tableLayouts = {
        custom: {
            fillColor: function (rowIndex: number) {
                return rowIndex % 2 !== 0 ? '#00000' : null
            },
            hLineColor: '#00000',
            vLineColor: '#00000',
            paddingLeft: function () {
                return 10
            },
            paddingRight: function () {
                return 10
            },
        },
    }
    // playground requires you to assign document definition to a variable called dd
    const answer = state.studentActive.incorrerAnswer.map((item: any) => ({
        question: `${item['Câu Hỏi']} - ${item['Giải pháp']}`,
        link: item['Đường Dẫn'],
    }))
    const filename = `${state.studentActive['Họ và Tên']}(${state.studentActive['Số Báo Danh']})-${state.studentActive['Mã đề']}.pdf`
    const mark = caculatorMark()
    const content = generateContent(state.studentActive, answer, mark)
    pdfMaker.createPdf(content).getDataUrl((base64Data: string) => {
        const blob = base64ToPDF(
            base64Data.replace('data:application/pdf;base64,', ''),
            filename
        )
        const url = URL.createObjectURL(blob)

        // Tạo một đường link để tải tệp PDF
        const link = document.createElement('a')
        link.href = url
        link.download = filename || 'loigiai.pdf'
        link.click()

        // Giải phóng URL đối tượng khi đã sử dụng xong
        URL.revokeObjectURL(url)
    })
}
const base64ToPDF = (base64Data: any, fileName: string) => {
    const byteCharacters = atob(base64Data)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    const blob = new Blob([byteArray], { type: 'application/pdf' })
    state.pdf = blob
    return blob
}
const generateHTMLToPDF = async () => {
    dowloadPdf()
}
const onMarkStudent = (index: number) => {
    const student = state.students[index].value
    const answer = state.answer.find((item: any) => {
        return item.code == `${student['Mã đề']}`
    })
    const incorrerAnswer = checkAndGenerateAnswer(student, answer)
    state.studentActive = { ...student, incorrerAnswer }
}
const onLoadAnswer = () => {
    isOpen.value = false
}
// const schema = z.object({
//     code: z.string().min(3, 'Phải nhiều hơn 3 ký tự'),
// })
// const validate = (state: any): any[] => {
//     const errors = []
//     if (!state.code) {
//         errors.push({ path: 'code', message: 'Vui lòng nhập mã đề' })
//     }

//     return errors
// }

async function onSubmit(event: any) {
    if (!state.file) {
        toast.add({
            title: 'Bạn chưa tải file csv',
            timeout: 3000,
            icon: 'i-heroicons-exclamation-triangle',
            color: 'orange',
        })

        return
    }
    const codes = state.excercies.map((item: any) => item['Mã đề'])
    const codesUnique = [...new Set(codes)]
    if (!codesUnique.length) {
        toast.add({
            title: 'Lỗi đọc code',
            timeout: 3000,
            icon: 'i-heroicons-exclamation-triangle',
            color: 'orange',
        })
        return
    }
    state.loading = true
    const body = {
        code: codesUnique,
    }
    $fetch('/api/exam/find', { method: 'POST', body })
        .then((response: any) => {
            console.log('response.length', response.length)
            if (response.length) {
                // loadPdf()
                state.answer = response
                onMarkStudent(0)

                isOpen.value = true
            } else {
                throw ''
            }
        })
        .catch(() => {
            toast.add({
                title: 'Không tìm thấy',
                timeout: 3000,
                icon: 'i-heroicons-exclamation-triangle',
                color: 'orange',
            })
            isOpen.value = false
        })
        .finally(() => {
            state.loading = false
        })
}

async function sendEmail(): Promise<void> {
    await loadPdf()
    state.loading = true
    const data: IFormData = {
        name: state.studentActive,
        email: state.emailtest,
        subject: 'Trung tâm NQH Q10 - Sửa kết quả làm bài',
        body: `Chào các học viên của NQH Q10. Trung tâm xin gửi nội dung cho các bạn để rèn luyện thêm. File đáp án và lời giải chi tiết được đính kèm trực tiếp bên dưới. \n Số điểm: ${caculatorMark()}`,
    }
    successMessage.value = null

    const filename = `${state.studentActive['Số Báo Danh']}-${state.studentActive['Mã đề']}-ThucChien1-2-3.pdf`

    const headers = new Headers({
        fileName: filename,
    })

    const form = new FormData()
    form.append('name', state.studentActive['Họ và Tên'])
    form.append('email', data.email)
    form.append('subject', data.subject)
    form.append('body', data.body)
    form.append('pdf', state.pdf)

    const requestData: any = {
        formData: form,
        fileHeaders: headers,
    }
    const requestInit: any = {
        method: 'POST',
        body: requestData.formData,
        headers: requestData.fileHeaders,
    }
    try {
        $fetch('/api/user/email-sender', requestInit)
            .then((data) => {
                successMessage.value = 'Email has been sent.'
                toast.add({
                    title: 'Email đã được gửi đi.',
                    timeout: 3000,
                    icon: 'i-heroicons-check-circle',
                })
            })
            .catch((error) => {
                console.log('error', error)
                toast.add({
                    title: 'Gửi email lỗi ',
                    description: 'Vui lòng kiểm tra lại địa chỉ email.',
                    timeout: 3000,
                    icon: 'i-heroicons-exclamation-triangle',
                    color: 'orange',
                })
            })
            .finally(() => {
                state.loading = false
            })
    } catch (error) {
        console.log(error)
    }
}
const caculatorMark = () => {
    return (
        ((50 - state.studentActive.incorrerAnswer.length) / 50) *
        10
    ).toFixed(1)
}
</script>

<template>
    <div class="flex h-full flex-col gap-3 w-full overflow-y-hidden px-2 py-1">
        <div>
            <USlideover v-model="isOpen">
                <UCard
                    class="flex flex-col flex-1 h-full"
                    :ui="{
                        body: { base: 'flex-1' },
                        ring: '',
                        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
                    }"
                >
                    <template #header>
                        <div class="flex items-center justify-between">
                            <h3
                                class="text-base font-semibold leading-6 text-gray-900 dark:text-white uppercase"
                            >
                                Kiểm tra và chấm chữa
                            </h3>
                            <UButton
                                color="gray"
                                variant="ghost"
                                icon="i-heroicons-x-mark-20-solid"
                                class="-my-1"
                                @click="onLoadAnswer"
                            />
                        </div>
                    </template>
                    <div class="flex">
                        <div class="p-4 h-fit">
                            <UTabs
                                :items="state.students"
                                @change="onMarkStudent"
                                orientation="vertical"
                                :ui="{
                                    container: 'relative w-full',
                                    wrapper: 'flex items-center gap-4',
                                    list: {
                                        width: 'w-[240px]',
                                        tab: { height: 'h-8' },
                                    },
                                }"
                            >
                                <template #pdf>
                                    <div
                                        class="flex flex-col gap-2 overflow-hidden h-[600px] p-1"
                                    >
                                        <UProgress
                                            v-if="state.loading"
                                            animation="carousel"
                                        />
                                        <div class="flex justify-end gap-4">
                                            <UButton
                                                class="w-fit"
                                                @click="generateHTMLToPDF"
                                                >Tải bản PDF lời giải</UButton
                                            >
                                            <UFormGroup
                                                name="code"
                                                eager-validation
                                                required
                                            >
                                                <UInput
                                                    v-model="state.emailtest"
                                                    placeholder="Nhập email đích để test"
                                                />
                                            </UFormGroup>
                                            <UButton
                                                class="w-fit"
                                                @click="sendEmail"
                                                >Gửi kết lời giải qua
                                                Email</UButton
                                            >
                                        </div>
                                        <div
                                            class="shadow-[0_0_1px_#7a7a7a] rounded-sm p-4 flex-1 overflow-y-scroll"
                                        >
                                            <h2
                                                class="font-semibold text-[#3973ca] text-4xl text-center"
                                            >
                                                PHIẾU DẶN DÒ YÊU THƯƠNG
                                            </h2>
                                            <div
                                                class="grid grid-cols-3 px-2 gap-3 mt-3 font-semibold text-[#3973ca]"
                                            >
                                                <p>
                                                    Họ và tên:
                                                    <span
                                                        v-if="
                                                            state.studentActive[
                                                                'Họ và Tên'
                                                            ]
                                                        "
                                                        >{{
                                                            state.studentActive[
                                                                'Họ và Tên'
                                                            ]
                                                        }}</span
                                                    >
                                                </p>
                                                <p>
                                                    Số báo danh:
                                                    <span
                                                        v-if="
                                                            state.studentActive[
                                                                'Số Báo Danh'
                                                            ]
                                                        "
                                                        >{{
                                                            state.studentActive[
                                                                'Số Báo Danh'
                                                            ]
                                                        }}</span
                                                    >
                                                </p>
                                                <p>Cơ sở: NQH Q10</p>
                                                <p>
                                                    Điểm bài thi:
                                                    <span
                                                        v-if="
                                                            state.studentActive
                                                                .incorrerAnswer
                                                                .length
                                                        "
                                                    >
                                                        {{
                                                            caculatorMark()
                                                        }}</span
                                                    >
                                                    <span v-else> 10</span>
                                                </p>
                                                <p>
                                                    Học sinh đang học tại NQH:
                                                    Có
                                                </p>
                                                <p>
                                                    Mã đề:
                                                    <span
                                                        v-if="
                                                            state.studentActive[
                                                                'Mã đề'
                                                            ]
                                                        "
                                                        >{{
                                                            state.studentActive[
                                                                'Mã đề'
                                                            ]
                                                        }}</span
                                                    >
                                                </p>
                                            </div>
                                            <p
                                                class="font-semibold text-[#313131] text-2xl text-center mt-3"
                                            >
                                                Những nội dung con cần ôn tập
                                                thêm - Đề số: 2
                                            </p>
                                            <ol class="list-decimal p-5">
                                                <li
                                                    v-for="item in state
                                                        .studentActive
                                                        .incorrerAnswer"
                                                >
                                                    <a
                                                        href="https://www.google.co.uk/"
                                                        class="underline text-[#3973ca]"
                                                    >
                                                        {{ item['Câu Hỏi'] }} -
                                                        {{ item['Giải pháp'] }}
                                                    </a>
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </template></UTabs
                            >
                        </div>
                    </div>
                </UCard>
            </USlideover>
        </div>

        <div class="flex justify-between items-end">
            <UForm
                :state="state"
                @submit="onSubmit"
                class="flex gap-3 flex-wrap items-start"
            >
                <UFormGroup
                    label="Tải lên file csv"
                    name="file"
                    class="w-fit flex flex-col"
                    eager-validation
                >
                    <input
                        @change="handleChangeFile"
                        type="file"
                        accept="*"
                        size="sm"
                        class="block w-full border rounded-md border-gray-300 text-sm text-gray-4000 file:h-full h-8 file:rounded-s-md file:border-0 file:text-sm file:font-semibold file:bg-[#22c55e] file:text-white hover:file:bg-[#16a34a]"
                    />
                </UFormGroup>
                <!-- <UFormGroup label="Mã đề" name="code" eager-validation required>
                    <UInput v-model="state.code" placeholder="Nhập mã đề" />
                </UFormGroup> -->
                <div class="flex flex-1 items-end justify-end">
                    <UButton
                        type="submit"
                        class="h-fit mt-6"
                        :loading="state.loading"
                        >Kiểm tra và sửa bài</UButton
                    >
                </div>
            </UForm>
        </div>
        <div
            class="w-full flex flex-col h-full bg-white rounded-md shadow-sm border overflow-hidden"
        >
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
                :columns="state.columns"
                :rows="rows"
            />

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
