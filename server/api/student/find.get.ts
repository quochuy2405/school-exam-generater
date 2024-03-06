import { Student } from '~~/server/models/student.model'

export default defineEventHandler(async (event) => {
    const student = await Student.find()

    return student
})
