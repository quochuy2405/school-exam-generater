<script setup lang="ts">
import { coso, khuvuc, mon, thucchien } from '@/constants/options'
import { studentColumns } from '@/constants/student'
import { generateContent, readLinesFromCSV } from '@/utils/csvToJson'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { z } from 'zod'
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
    mon: undefined,
    type: undefined,
    khoi: undefined,
    coso: undefined,
    area: undefined,
})
const page = ref(1)
const pageCount = 10
let intervalTime: any = undefined
const rows = computed(() => {
    const data = state.excercies?.slice((page.value - 1) * pageCount, page.value * pageCount)
    return data
})

const schema = z.object({
    mon: z.string({
        required_error: 'Vui lòng chọn môn học',
    }),
    type: z.string({
        required_error: 'Vui lòng chọn lớp thực chiến',
    }),
    area: z.string({
        required_error: 'Vui lòng chọn khu vực',
    }),
    khoi: z.string({
        required_error: 'Vui lòng chọn khối',
    }),
    coso: z.string({
        required_error: 'Vui lòng chọn cơ sở',
    }),
})

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
                label: `${item['HO VA TEN']} (${item['SO BAO DANH']}) - ${item['MA DE']}`,
                content: `${item['HO VA TEN']} (${item['SO BAO DANH']}) - ${item['MA DE']}`,
                value: item,
                slot: 'pdf',
            }
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
        question: `${item['Dạng']} - ${item['Giải pháp']}`,
        link: item['Đường Dẫn'],
    }))

    const mark = onMarkStudent(student).mark
    const content = generateContent(
        student,
        answer,
        mark,
        filter.mon || '',
        state?.studentsInfo?.[Number(student['SO BAO DANH'])]?.['SCHOOL'],
        !!state?.studentsInfo?.[Number(student?.['SO BAO DANH'])]?.['NQH'],
        state?.studentsInfo?.[Number(student['SO BAO DANH'])]?.['COSO']
    )
    const filename = `${student['HO VA TEN']}-${student['SO BAO DANH']}-${filter.mon}.pdf`
    if (download) {
        pdfMaker.createPdf(JSON.parse(JSON.stringify(content))).getBlob((blob: any) => {
            const url = URL.createObjectURL(blob)

            // Tạo một đường link để tải tệp PDF
            const link = document.createElement('a')
            link.href = url
            link.download = toNonAccentVietnamese(filename) || 'loigiai.pdf'
            link.click()

            // Giải phóng URL đối tượng khi đã sử dụng xong
            URL.revokeObjectURL(url)
        })
    }
    return { filename, content }
}

const onMarkStudent = (student: any) => {
    const answer = state.answer.find((item: any) => {
        return `${item.code}` == `${student['MA DE']}`
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
    const subScore = incorrerAnswer.reduce((total: number, item: any) => {
        if (Number.isNaN(Number(item['Điểm']))) return total
        return total + Number(item['Điểm'])
    }, 0.0)
    const mark = (10 - subScore).toFixed(1)
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
    const codes = state.excercies.map((item: any) => item['MA DE'])
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
    const monConvert: any = {
        Toán: 'toan',
        Lý: 'ly',
        Hóa: 'hoa',
        Anh: 'anh',
        Văn: 'van',
        Sinh: 'sinh',
        ĐGNL: 'dgnl',
    }

    const body = {
        code: codesUnique,
        type: filter.type,
        mon: monConvert[filter.mon || ''],
        coso: filter.coso,
        khoi: filter.khoi,
    }
    $fetch('/api/exam/find', { method: 'POST', body })
        .then((response: any) => {
            if (response.length) {
                state.answer = response
                const codes = state.excercies.map((item: any) => item['SO BAO DANH'])

                $fetch('/api/student/find', {
                    method: 'POST',
                    body: {
                        codes,
                        type: filter.type,
                        coso: filter.coso,
                        area: filter.area,
                        khoi: filter.khoi,
                        mon: filter.mon,
                    },
                })
                    .then((studentsInfo) => {
                        let keyMap = {}
                        studentsInfo.forEach((item: any) => {
                            keyMap = { ...keyMap, [item.SBD]: item }
                        })
                        console.log('keyMap', keyMap)
                        state.studentsInfo = keyMap
                        addToHistory(state.students)
                    })
                    .catch(() => {
                        toast.add({
                            title: 'Không tìm thấy thông tin học sinh',
                            description: 'Vui lòng kiểm tra lại các ô lựa chọn',
                            timeout: 8000,
                            icon: 'i-heroicons-exclamation-triangle',
                            color: 'orange',
                        })
                    })
                if (!isOpen.value) {
                    isOpen.value = true
                    onChangeTab(0)
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

async function sendEmail(student: any, email: string) {
    state.loading = true

    try {
        const pdfMaker = $pdfMake as any
        const { content, filename } = await onPdfByStudent(student)
        const pdfDocGenerator = pdfMaker.createPdf(JSON.parse(JSON.stringify(content)))
        await pdfDocGenerator.getBlob(async (pdf: string) => {
            const data: any = {
                name: student['HO VA TEN'],
                email: email,
                mon: filter.mon,
                diem: onMarkStudent(student).mark,
                sbd: student['SO BAO DANH'],
            }
            successMessage.value = null
            const utf8EncodedFileName = toNonAccentVietnamese(filename)
            const headers = new Headers({
                fileName: `${utf8EncodedFileName}`,
            })

            const form = new FormData()
            form.append('name', data.name)
            form.append('email', data.email)
            form.append('mon', data.mon)
            form.append('sbd', data.sbd)
            form.append('diem', data.diem)
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

            $fetch('/api/user/email-sender', requestInit)
                .then(() => {
                    state.emailList.success.push(student['SO BAO DANH'])
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
        })
        return 1
    } catch (error) {
        state.loading = false
        toast.add({
            title: 'Gửi email lỗi đến ',
            description: 'Vui lòng kiểm tra lại địa chỉ email.',
            timeout: 3000,
            icon: 'i-heroicons-exclamation-triangle',
            color: 'orange',
        })
        return 0
    }
}

const addStudentToBin = () => {
    const body = state.excercies
        .filter((item: any) => !state.emailList.success.includes(item['SO BAO DANH']))
        .map((item: any) => {
            return {
                SOBAODANH: item['SO BAO DANH'],
                HOVATEN: item['HOVARTEN'],
                DAPAN: item,
                COSO: filter.coso,
                AREA: filter.area,
                KHOI: filter.khoi,
                MON: filter.mon,
                THUCCHIEN: filter.type,
            }
        })
    $fetch('/api/bin/add', {
        method: 'POST',
        body,
    })
        .then(() => {
            toast.add({
                title: 'Đã backup dữ liệu ',
                timeout: 3000,
                icon: 'i-heroicons-exclamation-triangle',
            })
        })
        .catch(() => {
            toast.add({
                title: 'Không thể backup dữ liệu ',
                description: 'Vui lòng tải file pdf xuống để tránh mất dữ liệu.',
                timeout: 3000,
                icon: 'i-heroicons-exclamation-triangle',
                color: 'red',
            })
        })
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
                return item.code == `${student['MA DE']}`
            })

            const incorrerAnswer = checkAndGenerateAnswer(student, answer)
            student.incorrerAnswer = incorrerAnswer
            // playground requires you to assign document definition to a variable called dd
            const resolve = incorrerAnswer?.map((item: any) => ({
                question: `${item['Dạng']} - ${item['Giải pháp']}`,
                link: item['Đường Dẫn'],
            }))
            const mark = onMarkStudent(student).mark
            const content = generateContent(
                student,
                resolve,
                mark,
                filter.mon || '',
                state?.studentsInfo?.[Number(student['SO BAO DANH'])]?.['SCHOOL'],
                !!state?.studentsInfo?.[Number(student?.['SO BAO DANH'])]?.['NQH'],
                state?.studentsInfo?.[Number(student['SO BAO DANH'])]?.['COSO']
            )

            const pdfDocGenerator = pdfMaker.createPdf(JSON.parse(JSON.stringify(content)))

            pdfDocGenerator.getBlob(async (blob: string) => {
                const name = `${student['HO VA TEN']}-${student['SO BAO DANH']}-${filter.mon}.pdf`

                state.zips.push({ name: toNonAccentVietnamese(name), blob })
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
            const email = state.studentsInfo[Number(student['SO BAO DANH'])]?.['EMAIL']

            if (email) {
                new Promise((resolve) => {
                    sendEmail(student, email).finally(() => resolve(1))
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
        const MADE = st.value['MA DE']
        const NAME = st.value['HO VA TEN']
        const SBD = st.value['SO BAO DANH']
        const NGAY = today
        const MON = filter.mon
        const DOT = filter.type
        const KHUVUC = filter.area
        const COSO = filter.coso
        const KHOI = filter.khoi
        return {
            SCORE,
            MADE,
            NAME,
            SBD,
            NGAY,
            MON,
            DOT,
            KHUVUC,
            COSO,
            KHOI,
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

const sendEmailEarch = async () => {
    try {
        const student = state.excercies[state.studentActive.index]
        const email = state.studentsInfo[Number(student['SO BAO DANH'])]?.['EMAIL']
        await sendEmail(student, email)
    } catch (error) {
        console.log('error', error)
    }
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
                                <p
                                    class="border p-3 rounded-md font-semibold text-emerald-500"
                                    v-if="
                                        state.studentsInfo[
                                            Number(state.studentActive['SO BAO DANH'])
                                        ]?.['EMAIL']
                                    "
                                >
                                    {{
                                        state.studentsInfo[
                                            Number(state.studentActive['SO BAO DANH'])
                                        ]?.['EMAIL']
                                    }}
                                </p>
                                <UButton
                                    v-for="(item, index) in state.students"
                                    :key="index"
                                    orientation="vertical"
                                    :class="[
                                        !!state.emailList.success.length &&
                                            !state.emailList.success.includes(
                                                item.value['SO BAO DANH']
                                            ) &&
                                            'bg-white text-black',
                                        state.studentActive['SO BAO DANH'] ===
                                            `${item.value['SO BAO DANH']}` &&
                                            'bg-black text-white hover:bg-black',
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

                                    <UButton class="w-fit" @click="sendEmailEarch"
                                        >Gửi kết lời giải qua từng Email</UButton
                                    >
                                    <UButton
                                        class="w-fit"
                                        :disabled="!state.emailList.success.length"
                                        @click="addStudentToBin"
                                        >Lưu kết quả học sinh lỗi email</UButton
                                    >
                                </div>

                                <div
                                    class="shadow-[0_0_1px_#7a7a7a] rounded-sm border-4 border-[#0071bc] overflow-y-scroll relative w-[881px]"
                                >
                                    <img src="/pdf-layout.png" width="100%" />

                                    <span
                                        class="text-[#0071bc] font-bold absolute left-[105px] top-[60px] opacity-95"
                                        v-if="state?.studentActive['HO VA TEN']"
                                        >{{ state.studentActive['HO VA TEN'] }}</span
                                    >

                                    <span
                                        class="text-[#0071bc] font-bold absolute left-[425px] top-[60px] opacity-95"
                                        v-if="state?.studentActive['SO BAO DANH']"
                                        >{{ state.studentActive['SO BAO DANH'] }}</span
                                    >

                                    <span
                                        class="text-[#0071bc] font-bold absolute left-[645px] top-[60px] opacity-95"
                                    >
                                        <span
                                            v-if="
                                                state.studentsInfo[
                                                    Number(state.studentActive['SO BAO DANH'])
                                                ]?.['COSO']
                                            "
                                            >{{
                                                state.studentsInfo[
                                                    Number(state.studentActive['SO BAO DANH'])
                                                ]?.['COSO']
                                            }}</span
                                        >
                                    </span>
                                    <p
                                        class="text-[#0071bc] font-bold absolute left-[95px] top-[94px] opacity-95"
                                    >
                                        <span
                                            v-if="
                                                state.studentsInfo[
                                                    Number(state.studentActive['SO BAO DANH'])
                                                ]?.['SCHOOL']
                                            "
                                            >{{
                                                state.studentsInfo[
                                                    Number(state.studentActive['SO BAO DANH'])
                                                ]?.['SCHOOL']
                                            }}</span
                                        >
                                    </p>
                                    <p
                                        class="text-[#0071bc] font-bold absolute left-[365px] top-[94px] opacity-95"
                                    >
                                        <span>
                                            {{ filter.mon }}
                                        </span>
                                    </p>
                                    <p
                                        class="text-[#0071bc] font-bold absolute left-[725px] top-[96px] opacity-95"
                                        :class="[
                                            !state.studentsInfo[
                                                Number(state.studentActive['SO BAO DANH'])
                                            ]?.['NQH'] && 'left-[825px]',
                                        ]"
                                    >
                                        X
                                    </p>
                                    <p
                                        class="text-[#0071bc] font-bold absolute left-[635px] top-[155px] opacity-95 text-xl"
                                    >
                                        <span v-if="state?.studentActive['MA DE']">{{
                                            state.studentActive['MA DE']
                                        }}</span>
                                    </p>

                                    <div class="p-4">
                                        <ol class="list-decimal p-5">
                                            <li v-for="item in state.studentActive.incorrerAnswer">
                                                <a
                                                    :href="item['Đường Dẫn']"
                                                    class="underline font-medium text-[#0071bc]"
                                                >
                                                    Con sai {{ item['Dạng'] }} => Con hãy làm
                                                    {{ item['Giải pháp'] }}
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
                :state="filter"
                :schema="schema"
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

                <UFormGroup label="Khu vực" name="area" eager-validation required>
                    <USelect
                        v-model="filter.area"
                        :options="khuvuc"
                        placeholder="Khu vực"
                        class="w-40"
                    />
                </UFormGroup>
                <UFormGroup label="Cơ sở" name="coso" eager-validation required>
                    <USelect
                        v-model="filter.coso"
                        :options="coso"
                        placeholder="Cơ sở"
                        class="w-40"
                    />
                </UFormGroup>
                <UFormGroup label="Khối" name="khoi" eager-validation required>
                    <USelect
                        v-model="filter.khoi"
                        :options="[9, 12]"
                        placeholder="Khối"
                        class="w-40"
                    />
                </UFormGroup>
                <UFormGroup label="Môn" name="mon" eager-validation required>
                    <USelect v-model="filter.mon" :options="mon" placeholder="Môn" class="w-40" />
                </UFormGroup>
                <UFormGroup label="Số thực chiến" name="type" eager-validation required>
                    <USelect
                        :options="thucchien"
                        placeholder="Số thực chiến"
                        class="w-40"
                        v-model="filter.type"
                    />
                </UFormGroup>

                <UButton type="submit" class="h-fit mt-6" :loading="state.loading"
                    >Kiểm tra và sửa bài</UButton
                >
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
