import { Exam } from '~~/server/models/exams.model'

export default defineEventHandler(async (event) => {
    const payload: any | null = await readBody(event)
    const code = payload.code
    const mon = payload.mon
    const khoi = payload.khoi
    const de = payload.de

    const exam = await Exam.find({ code: { $in: code }, mon, khoi, de })

    if (exam.length == 0) {
        return setResponseStatus(event, 404, 'Not Found')
    }
    return exam
})
