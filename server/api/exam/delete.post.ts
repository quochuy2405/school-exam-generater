import { Exam } from '~~/server/models/exams.model'

export default defineEventHandler(async (event) => {
    const payload: any | null = await readBody(event)
    const code = payload.code
    const type = payload.type
    const subject = payload.subject
    const exam = await Exam.deleteOne({ code: { $in: code }, type, subject })

    if (!exam.deletedCount) {
        return setResponseStatus(event, 404, 'Not deletedCount')
    }
    return exam
})
