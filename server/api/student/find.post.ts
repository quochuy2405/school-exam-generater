import { Student } from '~~/server/models/student.model'

export default defineEventHandler(async (event) => {
    const payload: any | null = await readBody(event)
    const codes = payload.codes
    const area = payload.area
    const coso = payload.coso
    const khoi = payload.khoi
    const type = payload.type

    const students = await Student.find({
        SBD: { $in: codes },
        AREA: area,
        COSO: coso,
        KHOI: khoi,
        CLASS: type,
    })
    if (students.length == 0) {
        return setResponseStatus(event, 404, 'Not Found')
    }
    return students
})
