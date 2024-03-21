import { Exam } from '~/server/models/exams.model'

export default defineEventHandler(async (event) => {
    const payload: any | null = await readBody(event)

    const newExam = {
        code: payload.code,
        excercies: payload.excercies,
        type: payload.type,
        subject: payload.subject,
        khoi: payload.khoi,
        score: payload.score,
    }
    try {
        await Exam.updateOne(
            {
                code: payload.code,
                type: payload.type,
                subject: payload.subject,
                khoi: payload.khoi,
            },
            { $set: newExam }
        )
        return newExam
    } catch (error) {
        console.log('error', error)
        return setResponseStatus(event, 404, 'Not updated')
    }
})
