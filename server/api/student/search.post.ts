import { Student } from '~~/server/models/student.model'

export default defineEventHandler(async (event) => {
    const payload: any | null = await readBody(event)
    const search = payload.search
    const student = await Student.find({ SBD: { $regex: search } })
    if (student.length == 0) {
        return setResponseStatus(event, 404, 'Not Found')
    }
    return student
})
