import { Exam } from '~/server/models/exams.model'

export default defineEventHandler(async (event) => {
    const payload: any | null = await readBody(event)

    const newExam = {
        code: payload.code,
        excercies: payload.excercies,
    }
    try {
        await Exam.create(newExam)
        return newExam
    } catch (error) {
        console.log('error', error)
        return setResponseStatus(event, 404, 'Not created')
    }
})
