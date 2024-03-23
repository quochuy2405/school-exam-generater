import { Student } from '~/server/models/student.model'

async function addStudent(docs: any[]): Promise<any[]> {
    try {
        const existingStudents = await Student.find()

        const validStudents = docs.filter((doc: any) => {
            // Kiểm tra xem có sinh viên nào trong cơ sở dữ liệu có cùng SBD và class không
            const existingStudent = existingStudents.find(
                (existingStudent) =>
                    existingStudent.SBD === doc.SBD &&
                    existingStudent.CLASS === doc.CLASS &&
                    existingStudent.MON === doc.MON &&
                    existingStudent.AREA === doc.AREA
            )

            // Nếu không tìm thấy sinh viên nào trong cơ sở dữ liệu có cùng SBD và class, sinh viên mới này là hợp lệ
            return !existingStudent
        })
        // Thêm các sinh viên mới không trùng số báo danh vào cơ sở dữ liệu
        if (validStudents.length > 0) {
            try {
                await Student.insertMany(validStudents)
            } catch (error) {
                console.log('error', error)
            }
        } else {
            throw new Error('Failed to insert students')
        }

        return validStudents
    } catch (error) {
        throw new Error('Failed to insert students')
    }
}
export default async function eventHandler(event: any) {
    try {
        const payload = await readBody(event)
        if (!payload || !Array.isArray(payload)) {
            throw new Error('Invalid payload')
        }

        const newStudents = await addStudent(payload)

        return setResponseStatus(event, 200, JSON.stringify(newStudents))
    } catch (error: any) {
        console.log('error', error)
        return setResponseStatus(event, 400, error.message || 'Bad request')
    }
}
