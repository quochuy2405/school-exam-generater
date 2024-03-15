import { History } from '~/server/models/history.model'

async function checkingAndAdding(docs: any) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Lọc ra các tài liệu không gây ra lỗi
    const validDocs = []
    for (const doc of docs) {
        const count = await History.countDocuments({
            SDB: doc.SDB,
            MADE: doc.MADE,
            MON: doc.MON,
            DOT: doc.DOT,
            NGAY: { $gte: today },
        })
        if (count === 0) {
            validDocs.push(doc)
        }
    }

    // Thêm các tài liệu không gây ra lỗi vào cơ sở dữ liệu
    if (validDocs.length > 0) {
        try {
            await History.insertMany(validDocs)
        } catch (error) {
            throw new Error('Failed to insert documents')
        }
    }
}

export default async function handleRequest(event: any) {
    try {
        const payload = await readBody(event)

        if (!payload || !Array.isArray(payload)) {
            throw new Error('Invalid payload')
        }

        await checkingAndAdding(payload)

        return payload
    } catch (error: any) {
        return setResponseStatus(event, 400, error.message || 'Bad request')
    }
}
