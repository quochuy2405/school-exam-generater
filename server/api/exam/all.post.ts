import { Exam } from '~~/server/models/exams.model'

export default defineEventHandler(async (event) => {
    const payload: any | null = await readBody(event)
    const subject = payload.subject
    const exams = await Exam.find({ subject })

    if (exams.length == 0) {
        return setResponseStatus(event, 404, 'Not Found')
    }
    return exams
})
