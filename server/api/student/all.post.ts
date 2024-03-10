import { Student } from '~~/server/models/student.model'

export default defineEventHandler(async (event) => {
    const student = await Student.find()
    if (student.length == 0) {
        return setResponseStatus(event, 404, 'Not Found')
    }
    return student
})
