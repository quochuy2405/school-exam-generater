import { Student } from '~/server/models/student.model'

export default defineEventHandler(async (event) => {
    const payload: any | null = await readBody(event)
    const SBD = payload.SBD
    const MON = payload.MON
    const AREA = payload.AREA
    const CLASS = payload.CLASS
    const KHOI = payload.KHOI
    const COSO = payload.COSO

    const student = await Student.deleteOne({ SBD, MON, KHOI, AREA, CLASS, COSO })

    if (!student.deletedCount) {
        return setResponseStatus(event, 404, 'Not deletedCount')
    }
    return student
})
