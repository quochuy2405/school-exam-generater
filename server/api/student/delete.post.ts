import { Student } from '~/server/models/student.model'

export default defineEventHandler(async (event) => {
    const payload: any | null = await readBody(event)
    const SBD = payload.SBD

    const student = await Student.deleteOne({ SBD: SBD })

    if (!student.deletedCount) {
        return setResponseStatus(event, 404, 'Not deletedCount')
    }
    return student
})
