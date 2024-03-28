import { Exam } from '~~/server/models/exams.model'

export default defineEventHandler(async (event) => {
    const payload: any | null = await readBody(event)
    const mon = payload.mon
    const exams = await Exam.find({ mon })

    if (exams.length == 0) {
        return setResponseStatus(event, 404, 'Not Found')
    }
    return exams
})
