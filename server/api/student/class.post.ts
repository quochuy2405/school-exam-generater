import { Student } from '~~/server/models/student.model'

export default defineEventHandler(async (event) => {
    const payload = await readBody(event)
    const CLASS = payload.CLASS
    const student = await Student.find({ CLASS })
    if (student.length == 0) {
        return setResponseStatus(event, 404, 'Not Found')
    }
    return student
})
