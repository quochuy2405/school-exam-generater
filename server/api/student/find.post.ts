import { Student } from '~~/server/models/student.model'

export default defineEventHandler(async (event) => {
    const payload: any | null = await readBody(event)
    const codes = payload.codes
    const area = payload.area
    const coso = payload.coso
    const khoi = payload.khoi
    const lop = payload.lop
    const mon = payload.mon

    const students = await Student.find({
        SBD: { $in: codes },
        AREA: area,
        COSO: coso,
        KHOI: khoi,
        CLASS: lop,
        MON: mon,
    })
    if (students.length == 0) {
        return setResponseStatus(event, 404, 'Not Found')
    }
    return students
})
