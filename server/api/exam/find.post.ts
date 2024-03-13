import { Exam } from '~~/server/models/exams.model'

export default defineEventHandler(async (event) => {
    const payload: any | null = await readBody(event)
    const code = payload.code
    const type = payload.type
    const subject = payload.subject
    const exam = await Exam.find({ code: { $in: code }, type, subject })

    if (exam.length == 0) {
        return setResponseStatus(event, 404, 'Not Found')
    }
    return exam
})
