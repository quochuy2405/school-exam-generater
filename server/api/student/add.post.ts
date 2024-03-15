import { Student } from '~/server/models/student.model'

async function addStudent(docs: any) {
    const existingStudentIDs = await Student.distinct('SBD')

    // Lọc ra các sinh viên mới không trùng số báo danh
    const validStudents = docs.filter((doc: any) => !existingStudentIDs.includes(doc.SBD))

    // Thêm các sinh viên mới không trùng số báo danh vào cơ sở dữ liệu
    if (validStudents.length > 0) {
        try {
            await Student.insertMany(validStudents)
        } catch (error) {
            throw new Error('Failed to insert students')
        }
    }
    return validStudents
}

export default async function handleRequest(event: any) {
    try {
        const payload = await readBody(event)

        if (!payload || !Array.isArray(payload)) {
            throw new Error('Invalid payload')
        }

        const newStudents = await addStudent(payload)

        return newStudents
    } catch (error: any) {
        return setResponseStatus(event, 400, error.message || 'Bad request')
    }
}
