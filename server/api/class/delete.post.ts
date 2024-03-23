import { Student } from '~/server/models/student.model'

export default defineEventHandler(async (event) => {
    const payload: any | null = await readBody(event)
    const AREA = payload.AREA
    const COSO = payload.COSO
    const KHOI = payload.KHOI
    const CLASS = payload.CLASS
    console.log('{ AREA, COSO, KHOI, CLASS }', { AREA, COSO, KHOI, CLASS })

    const student = await Student.deleteMany({ AREA, COSO, KHOI, CLASS })

    if (!student.deletedCount) {
        return setResponseStatus(event, 404, 'Not deletedCount')
    }
    return student
})
