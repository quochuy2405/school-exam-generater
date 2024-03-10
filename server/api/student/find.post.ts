import { Student } from '~~/server/models/student.model'

export default defineEventHandler(async (event) => {
    const payload: any | null = await readBody(event)
    const codes = payload.codes
    const student = await Student.find({ SBD: { $in: codes } })
    if (student.length == 0) {
        return setResponseStatus(event, 404, 'Not Found')
    }
    return student
})
