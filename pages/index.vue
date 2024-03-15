<script setup lang="ts">
import { studentColumns } from '@/constants/student'
import { generateContent, readLinesFromCSV } from '@/utils/csvToJson'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { z } from 'zod'
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
    file: undefined,
    columns: [] as any,
    excercies: [] as any,
    students: [] as any,
    studentActive: undefined as any,
    answer: [] as any,
    pdf: [] as any,
    loading: false,
    zips: [] as any,
    studentsInfo: {} as any,
    studentEmailCount: 0,
    emailList: {
        success: [] as Array<string>,
        fail: [] as Array<string>,
    },
})
const filter = reactive({
    subject: 'Toán',
    type: 'Thực chiến 1',
})
const page = ref(1)
const pageCount = 10
let intervalTime: any = undefined
const rows = computed(() => {
    const data = state.excercies?.slice((page.value - 1) * pageCount, page.value * pageCount)
    return data
})

const schema = z.object({
    subject: z.string(),
    type: z.string(),
})
const validate = (state: any): any[] => {
    const errors = []
    if (!state.subject) {
        errors.push({ path: 'subject', message: 'Vui lòng chọn môn.' })
    }
    if (!state.type) {
        errors.push({ path: 'type', message: 'Vui lòng chọn số thực chiến.' })
    }

    return errors
}

const handleChangeFile = (event: any) => {
    if (intervalTime) clearInterval(intervalTime)
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
        state.studentActive.index = 0

        state.students = state.excercies.map((item: any) => {
            return {
                label: `${item['Họ và Tên']} (${item['Số Báo Danh']}) - ${item['Mã đề']}`,
                content: `${item['Họ và Tên']} (${item['Số Báo Danh']}) - ${item['Mã đề']}`,
                value: item,
                slot: 'pdf',
            }
        })
        const codes = state.excercies.map((item: any) => item['Số Báo Danh'])

        $fetch('/api/student/find', {
            method: 'POST',
            body: { codes },
        }).then((studentsInfo) => {
            let keyMap = {}
            studentsInfo.forEach((item: any) => {
                keyMap = { ...keyMap, [item.SBD]: item }
            })
            state.studentsInfo = keyMap
        })
    }
    reader.readAsText(file)
    state.file = file
}

const onPdfByStudent = async (student: any, download = false) => {
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
    const { incorrerAnswer } = onMarkStudent(student)
    student.incorrerAnswer = incorrerAnswer
    // playground requires you to assign document definition to a variable called dd
    const answer = student?.incorrerAnswer?.map((item: any) => ({
        question: `${item['Câu Hỏi']} - ${item['Giải pháp']}`,
        link: item['Đường Dẫn'],
    }))

    const mark = onMarkStudent(student).mark

    const content = generateContent(
        student,
        answer,
        mark,
        filter.subject,
        state?.studentsInfo?.[Number(student['Số Báo Danh'])]?.['SCHOOL'],
        !!state?.studentsInfo?.[Number(student?.['Số Báo Danh'])]?.['NQH']
    )
    const filename = `${student['Số Báo Danh']}-${student['Mã đề']}-ThucChien1-2-3.pdf`
    if (download) {
        pdfMaker.createPdf(JSON.parse(JSON.stringify(content))).getBlob((blob: any) => {
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
    return { filename, content }
}

const onMarkStudent = (student: any) => {
    const answer = state.answer.find((item: any) => {
        return `${item.code}` == `${student['Mã đề']}`
    })

    if (!answer) {
        toast.add({
            title: 'Mã đề chưa tạo!',
            timeout: 3000,
            icon: 'i-heroicons-exclamation-triangle',
            color: 'orange',
        })
        return
    }

    const incorrerAnswer = checkAndGenerateAnswer(student, answer)

    const mark = (
        ((Object.keys(answer?.excercies)?.length - incorrerAnswer?.length) /
            Object.keys(answer?.excercies)?.length) *
        10
    ).toFixed(1)
    return { incorrerAnswer, mark } as any
}
const onLoadAnswer = () => {
    isOpen.value = false
}

async function onSubmit() {
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
    const subjectConvert: any = {
        Toán: 'toan',
        Lý: 'ly',
        Hóa: 'hoa',
    }

    const body = {
        code: codesUnique,
        type: filter.type,
        subject: subjectConvert[filter.subject],
    }
    $fetch('/api/exam/find', { method: 'POST', body })
        .then((response: any) => {
            if (response.length) {
                state.answer = response
                if (!isOpen.value) {
                  isOpen.value = true
                    onChangeTab(0)
                    addToHistory(state.students)
                }
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

async function sendEmail(student: any, email: string): Promise<void> {
    state.loading = true

    try {
        const pdfMaker = $pdfMake as any
        const { content, filename } = await onPdfByStudent(student)
        const pdfDocGenerator = pdfMaker.createPdf(JSON.parse(JSON.stringify(content)))
        await pdfDocGenerator.getBlob(async (pdf: string) => {
            const data: IFormData = {
                name: student['Họ và Tên'],
                email: email,
                subject: 'Trung tâm NQH Q10 - Sửa kết quả làm bài',
                body: `Chào các học viên của NQH Q10. Trung tâm xin gửi nội dung cho các bạn để rèn luyện thêm. File đáp án và lời giải chi tiết được đính kèm trực tiếp bên dưới. \n Số điểm: ${
                    onMarkStudent(student).mark
                }`,
            }
            successMessage.value = null

            const headers = new Headers({
                fileName: filename,
            })

            const form = new FormData()
            form.append('name', data.name)
            form.append('email', data.email)
            form.append('subject', data.subject)
            form.append('body', data.body)
            form.append('pdf', pdf)

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
                await $fetch('/api/user/email-sender', requestInit)
                    .then(() => {
                        state.emailList.success.push(student['Số Báo Danh'])
                        successMessage.value = 'Email has been sent.'
                        toast.add({
                            title: 'Email đã được gửi đến ' + data.name,
                            timeout: 3000,
                            icon: 'i-heroicons-check-circle',
                        })
                    })
                    .catch((error) => {
                        state.loading = false
                        console.log('error', error)
                        toast.add({
                            title: 'Gửi email lỗi đến ' + data.name,
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
                state.loading = false
                console.log(error)
                toast.add({
                    title: 'Gửi email lỗi đến ' + data.name,
                    description: 'Vui lòng kiểm tra lại địa chỉ email.',
                    timeout: 3000,
                    icon: 'i-heroicons-exclamation-triangle',
                    color: 'orange',
                })
            }
        })
    } catch (error) {
        state.loading = false
        toast.add({
            title: 'Gửi email lỗi đến ',
            description: 'Vui lòng kiểm tra lại địa chỉ email.',
            timeout: 3000,
            icon: 'i-heroicons-exclamation-triangle',
            color: 'orange',
        })
    }
}

const downloadAll = async () => {
    state.loading = true
    const zip = new JSZip()
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
    let index = 0
    const interval = setInterval(async function () {
        if (index < state.excercies.length) {
            // docArray here is array of docs contents
            const student = state.excercies[index]
            const answer = state.answer.find((item: any) => {
                return item.code == `${student['Mã đề']}`
            })

            const incorrerAnswer = checkAndGenerateAnswer(student, answer)
            student.incorrerAnswer = incorrerAnswer
            // playground requires you to assign document definition to a variable called dd
            const resolve = incorrerAnswer?.map((item: any) => ({
                question: `${item['Câu Hỏi']} - ${item['Giải pháp']}`,
                link: item['Đường Dẫn'],
            }))
            const mark = onMarkStudent(student).mark
            const content = generateContent(
                student,
                resolve,
                mark,
                filter.subject,
                state?.studentsInfo?.[Number(student['Số Báo Danh'])]?.['SCHOOL'],
                !!state?.studentsInfo?.[Number(student?.['Số Báo Danh'])]?.['NQH']
            )

            const pdfDocGenerator = pdfMaker.createPdf(JSON.parse(JSON.stringify(content)))

            pdfDocGenerator.getBlob(async (blob: string) => {
                const name = `${student['Số Báo Danh']}-${student['Mã đề']}-ThucChien1-2-3.pdf`
                state.zips.push({ name, blob })
            })
            index++
        } else {
            state.zips.forEach((item: any) => {
                zip.file(item.name, item.blob)
            })
            zip.generateAsync({ type: 'blob' }).then(function (content) {
                saveAs(content, 'thuc-chien.zip')
            })
            state.loading = false
            clearInterval(interval)
        }
    }, 200)
}
const sendAllEmail = () => {
    // state.loading = true
    let index = 0

    intervalTime = setInterval(async function () {
        if (index < state.excercies.length) {
            const student = state.excercies[index]
            const email = state.studentsInfo[Number(student['Số Báo Danh'])]?.['EMAIL']

            if (email) {
                new Promise((resolve) => {
                    sendEmail(student, email)
                    resolve(1)
                }).then(() => {})
                state.studentEmailCount = index
            }
            index++
        } else {
            // state.loading = false
            state.studentEmailCount = 0
            if (intervalTime) clearInterval(intervalTime)
        }
    }, 1000)
}
const onChangeTab = (index: any) => {
    const student = state.excercies[index]
    const { incorrerAnswer, mark } = onMarkStudent(student)
    state.studentActive = student
    state.studentActive.incorrerAnswer = incorrerAnswer
    state.studentActive.mark = mark
    state.studentActive.index = index
}
const addToHistory = async (student: any) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dataHistory = student.map((st: any) => {
        const student = st.value
        const { mark: SCORE } = onMarkStudent(student)
        const MADE = st.value['Mã đề']
        const NAME = st.value['Họ và Tên']
        const SBD = st.value['Số Báo Danh']
        const NGAY = today
        const MON = filter.subject
        const DOT = filter.type
        return {
            SCORE,
            MADE,
            NAME,
            SBD,
            NGAY,
            MON,
            DOT,
        }
    })
    await $fetch('/api/history/add', {
        method: 'POST',
        body: dataHistory,
    })
        .then(() => {})
        .catch(() => {
            toast.add({
                title: 'Thêm lịch sử lỗi.',
                description: 'Vui lòng kiểm tra lại.',
                timeout: 3000,
                icon: 'i-heroicons-exclamation-triangle',
                color: 'orange',
            })
        })
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
                        <div class="p-4 h-fit flex">
                            <div class="flex flex-col gap-2 overflow-auto h-[80vh]">
                                <UButton
                                    v-for="(item, index) in state.students"
                                    :key="index"
                                    orientation="vertical"
                                    :class="[
                                        !!state.emailList.success.length &&
                                            !state.emailList.success.includes(
                                                item.value['Số Báo Danh']
                                            ) &&
                                            'bg-red-500',
                                        state.studentActive['Số Báo Danh'] ===
                                            `${item.value['Số Báo Danh']}` &&
                                            'bg-black hover:bg-black',
                                        ,
                                    ]"
                                    @click="() => onChangeTab(index)"
                                    >{{ item.label }}</UButton
                                >
                            </div>
                            <div class="flex flex-col gap-2 overflow-hidden h-[600px] p-1">
                                <UProgress v-if="state.loading" animation="carousel" />

                                <div class="flex justify-evenly gap-2 flex-wrap">
                                    <UButton class="w-fit" color="indigo" @click="downloadAll"
                                        >Tải bản toàn bộ PDF lời giải</UButton
                                    >

                                    <UButton class="w-fit" color="indigo" @click="sendAllEmail"
                                        >Gửi toàn bộ lời giải qua Email</UButton
                                    >
                                    <UButton
                                        class="w-fit"
                                        @click="onPdfByStudent(state.studentActive, true)"
                                        >Tải bản từng bản PDF lời giải</UButton
                                    >

                                    <UButton
                                        class="w-fit"
                                        @click="
                                            () => {
                                                const student =
                                                    state.excercies[state.studentActive.index]
                                                const email =
                                                    state.studentsInfo[
                                                        Number(student['Số Báo Danh'])
                                                    ]?.['EMAIL']
                                                sendEmail(student, email)
                                            }
                                        "
                                        >Gửi kết lời giải qua từng Email</UButton
                                    >
                                </div>

                                <div
                                    class="shadow-[0_0_1px_#7a7a7a] rounded-sm border-4 border-[#0071bc] overflow-y-scroll relative w-[881px]"
                                >
                                    <img src="/pdf-layout.png" width="100%" />

                                    <span
                                        class="text-[#0071bc] font-bold absolute left-[100px] top-[60px] opacity-95"
                                        v-if="state?.studentActive['Họ và Tên']"
                                        >{{ state.studentActive['Họ và Tên'] }}</span
                                    >

                                    <span
                                        class="text-[#0071bc] font-bold absolute left-[425px] top-[60px] opacity-95"
                                        v-if="state?.studentActive['Số Báo Danh']"
                                        >{{ state.studentActive['Số Báo Danh'] }}</span
                                    >

                                    <span
                                        class="text-[#0071bc] font-bold absolute left-[90px] top-[93px] opacity-95"
                                        v-if="
                                            state.studentsInfo[
                                                Number(state.studentActive['Số Báo Danh'])
                                            ]?.['SCHOOL']
                                        "
                                        >{{
                                            state.studentsInfo[
                                                Number(state.studentActive['Số Báo Danh'])
                                            ]?.['SCHOOL']
                                        }}</span
                                    >

                                    <span
                                        class="text-[#0071bc] font-bold absolute left-[645px] top-[60px] opacity-95"
                                    >
                                        NQH Quận 10
                                    </span>
                                    <p
                                        class="text-[#0071bc] font-bold absolute left-[365px] top-[94px] opacity-95"
                                    >
                                        <span >
                                            {{ filter.subject }}
                                        </span>
                                      
                                    </p>
                                    <p
                                        class="text-[#0071bc] font-bold absolute left-[725px] top-[96px] opacity-95"
                                        :class="[
                                            !state.studentsInfo[
                                                Number(state.studentActive['Số Báo Danh'])
                                            ]?.['NQH'] && 'left-[825px]',
                                        ]"
                                    >
                                        X
                                    </p>
                                    <p
                                        class="text-[#0071bc] font-bold absolute left-[635px] top-[155px] opacity-95 text-xl"
                                    >
                                        <span v-if="state?.studentActive['Mã đề']">{{
                                            state.studentActive['Mã đề']
                                        }}</span>
                                    </p>

                                    <div class="p-4">
                                        <ol class="list-decimal p-5">
                                            <li v-for="item in state.studentActive.incorrerAnswer">
                                                <a
                                                    :href="item['Đường Dẫn'] "
                                                    class="underline font-medium text-[#0071bc]"
                                                >
                                                    {{ item['Câu Hỏi'] }} - {{ item['Giải pháp'] }}
                                                </a>
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </UCard>
            </USlideover>
        </div>

        <div class="flex justify-between items-end flex-wrap">
            <UForm
                :validate="validate"
                :schema="schema"
                :state="filter"
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
                <UFormGroup label="Môn" name="subject" eager-validation required>
                    <USelect
                        v-model="filter.subject"
                        :options="['Toán', 'Lý', 'Hóa']"
                        placeholder="Lớp"
                        class="w-40"
                    />
                </UFormGroup>
                <UFormGroup label="Số thực chiến" name="type" eager-validation required>
                    <USelect
                        :options="['Thực chiến 1', 'Thực chiến 2']"
                        placeholder="Lớp"
                        class="w-40"
                        v-model="filter.type"
                    />
                </UFormGroup>
                <div class="flex flex-1 items-end justify-end">
                    <UButton type="submit" class="h-fit mt-6" :loading="state.loading"
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

            <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
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
