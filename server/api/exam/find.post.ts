import { Exam } from '~~/server/models/exams.model'

export default defineEventHandler(async (event) => {
    const payload: any | null = await readBody(event)
    const code = payload.code
    const exam = await Exam.find({ code })
    if (exam.length == 0) {
        return setResponseStatus(event, 404, 'Not Found')
    }
    return exam
})
