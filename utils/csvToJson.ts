import { background, imageHeadPdf } from '@/constants/background'
export const csvToJson = (csv: string) => {
    const lines = csv?.split('\r\n')
    const result = []
    const headers = lines[0]
        ?.split(',')
        ?.filter((header) => !!header?.trim())
        ?.map((item) => item?.trim())

    for (let i = 1; i < lines.length; i++) {
        const obj: any = {}
        const currentLine = lines[i]?.split(',')

        for (let j = 0; j < headers.length; j++) {
            if (currentLine[j]) {
                obj[headers[j]] = currentLine[j]
            }
        }

        result.push(obj)
    }

    return result
}

export const readLinesFromCSV = (csvData: string, startLineIndex: number) => {
    const lines = csvData.split('\n')

    const jsonData: any[] = []
    const header = lines[0]
        .split(',')
        .filter((header) => !!header?.trim())
        .map((item) => item?.trim())
    // Bắt đầu từ dòng startLineIndex, lặp qua số lượng linesToRead dòng và bỏ qua 3 dòng tiếp theo
    for (let i = startLineIndex + 1; i < lines.length; i += 1) {
        if (i >= lines.length) {
            // Kiểm tra nếu đã đọc hết dữ liệu
            break
        }

        const lineToRead = lines[i]
        const dataLineSplit = lineToRead.split(',')
        if (!dataLineSplit[1]?.trim()) continue
        const jsonDataLine = csvLineToJson(dataLineSplit, header) // Chuyển đổi dòng CSV thành JSON

        if (jsonDataLine !== null) {
            jsonData.push(jsonDataLine) // Thêm dòng đã chuyển đổi vào mảng kết quả
        }
    }
    return { header, jsonData }
}

const validates = ['TRA LOI']
// Hàm chuyển đổi dòng CSV thành JSON (đã được đề cập trong câu trả lời trước đó)
const csvLineToJson = (dataLineSplit: Array<string>, header: any) => {
    const data = dataLineSplit
    const entry: any = {}
    for (let j = 0; j < header.length; j++) {
        if (validates.includes(data[j]?.trim())) {
            continue
        }

        entry[header[j]] = data[j]?.trim() || 'X' // Gán giá trị vào từng cột
    }
    return entry
}

export const generateContent = (
    student: any,
    anwers: Array<any>,
    mark: string,
    subject: string,
    school: string,
    isNQH: boolean,
    coso: string
) => {
    const ol = anwers?.map((item) => ({
        text: `Con sai ${item.question} (Bấm để làm BT tương tự)`,
        link: item.link,
        decoration: 'underline',
        bold: '900',
        color: '#0070bb',
        margin: [0, 3],
    }))
    const content = {
        background,
        content: [
            { ...imageHeadPdf },
            {
                columns: [
                    {
                        width: '*',
                        text: student?.['HO VA TEN'] || '',
                        bold: true,
                        alignment: 'left',
                        fontSize: 12,
                        color: '#0070bb',
                        absolutePosition: { x: 80, y: 47 },
                    },
                    {
                        text: student?.['SO BAO DANH'] || '',
                        bold: true,
                        alignment: 'left',
                        fontSize: 12,
                        color: '#0070bb',
                        absolutePosition: { x: 290, y: 47 },
                    },
                    {
                        text: coso || '',
                        bold: true,
                        alignment: 'left',
                        fontSize: 12,
                        color: '#0070bb',
                        absolutePosition: { x: 450, y: 45 },
                    },
                ],
            },
            {
                columns: [
                    {
                        width: '*',
                        text: school || '',
                        bold: true,
                        alignment: 'left',
                        fontSize: 12,
                        color: '#0070bb',
                        absolutePosition: { x: 65, y: 69 },
                    },
                    {
                        text: subject || '',
                        bold: true,
                        alignment: 'left',
                        fontSize: 12,
                        color: '#0070bb',
                        absolutePosition: { x: 260, y: 70 },
                    },
                    {
                        text: 'X',
                        bold: true,
                        alignment: 'left',
                        fontSize: 12,
                        color: '#0070bb',
                        absolutePosition: { x: isNQH ? 503 : 572, y: 71 },
                        //
                    },
                ],
            },
            {
                text: student['MA DE'] || '',

                bold: true,
                alignment: 'center',
                fontSize: 15,
                color: '#0070bb',
                absolutePosition: { x: 353, y: 108 },
            },
            {
                ol,
                absolutePosition: { x: 30, y: 150 },
            },
        ],
    }
    return content
}
