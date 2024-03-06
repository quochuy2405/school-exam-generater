export const csvToJson = (csv: string) => {
    const lines = csv.split('\r\n')
    const result = []
    const headers = lines[0]
        .split(',')
        .filter((header) => !!header?.trim())
        .map((item) => item?.trim())

    for (let i = 1; i < lines.length; i++) {
        const obj: any = {}
        const currentLine = lines[i].split(',')

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
    for (let i = startLineIndex + 2; i < lines.length; i += 1) {
        if (i >= lines.length) {
            // Kiểm tra nếu đã đọc hết dữ liệu
            break
        }

        const lineToRead = lines[i]
        const dataLineSplit = lineToRead.split(',')

        if (!dataLineSplit[0]) continue
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

export const generateContent = (student: any, anwers: Array<any>, mark: string) => {
    const ol = anwers.map((item) => ({
        text: `${item.question} (Bấm để xem đáp án)`,
        link: item.link,
        decoration: 'underline',
        color: '#3973ca',
        margin: [0, 3],
    }))
    const content = {
        watermark: {
            text: 'Tên trung tâm',
            color: 'black',
            opacity: 0.05,
            bold: '900',
            italics: false,
            fontSize: 70,
        },
        content: [
            {
                layout: 'lightHorizontalLines', // optional
                table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 1,
                    widths: ['*'],

                    body: [
                        [
                            {
                                text: 'PHIẾU DẶN DÒ YÊU THƯƠNG',
                                bold: true,
                                alignment: 'center',
                                fontSize: 22,
                                color: '#3973ca',
                            },
                        ],
                    ],
                },
            },
            {
                columns: [
                    {
                        width: '*',
                        text: 'Họ và tên: ' + student['Họ và Tên'],
                        bold: true,
                        alignment: 'left',
                        fontSize: 12,
                        color: '#3973ca',
                        margin: [0, 10],
                    },
                    {
                        text: 'Số báo danh: ' + student['Số Báo Danh'],
                        bold: true,
                        alignment: 'left',
                        fontSize: 12,
                        color: '#3973ca',
                        margin: [0, 10],
                    },
                    {
                        text: 'Cơ sở: NQH Q10',
                        bold: true,
                        alignment: 'left',
                        fontSize: 12,
                        color: '#3973ca',
                        margin: [0, 10],
                    },
                ],
            },
            {
                columns: [
                    {
                        width: '*',
                        text: 'Điểm bài thi: ' + mark,
                        bold: true,
                        alignment: 'left',
                        fontSize: 12,
                        color: '#3973ca',
                    },
                    {
                        text: 'Học sinh đang học tại NQH: Có',
                        bold: true,
                        alignment: 'left',
                        fontSize: 12,
                        color: '#3973ca',
                    },
                    {
                        text: 'Mã đề: ' + student['Mã đề'],
                        bold: true,
                        alignment: 'left',
                        fontSize: 12,
                        color: '#3973ca',
                    },
                ],
            },
            {
                text:
                    'Những nội dung con cần ôn tập thêm - Đề số: ' +
                    student['Mã đề'],

                bold: true,
                alignment: 'center',
                fontSize: 16,
                color: 'black',
                margin: [0, 10],
            },

            {
                ol,
            },
        ],
    }
    return content
}
