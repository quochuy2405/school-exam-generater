import { Exam } from '~~/server/models/exams.model'

export default defineEventHandler(async (event) => {
    const payload: any | null = await readBody(event)
    const code = payload.code
    const de = payload.de
    const mon = payload.mon
    const khoi = payload.khoi
    const exam = await Exam.deleteOne({ code: { $in: code }, de, mon, khoi })

    if (!exam.deletedCount) {
        return setResponseStatus(event, 404, 'Not deletedCount')
    }
    return exam
})
