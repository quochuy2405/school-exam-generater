import { Student } from '~~/server/models/student.model'

export default defineEventHandler(async (event) => {
    const payload = await readBody(event)
    const CLASS = payload.CLASS
    const AREA = payload.AREA
    const COSO = payload.COSO
    const KHOI = payload.KHOI
    const student = await Student.find({ CLASS, AREA, COSO, KHOI })
    if (student.length == 0) {
        return setResponseStatus(event, 404, 'Not Found')
    }
    return student
})
