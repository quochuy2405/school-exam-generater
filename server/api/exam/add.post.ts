import { Exam } from '~/server/models/exams.model'

export default defineEventHandler(async (event) => {
    const payload: any | null = await readBody(event)

    const newExam = {
        code: payload.code,
        excercies: payload.excercies,
        mon: payload.mon,
        de: payload.de,
        khoi: payload.khoi,
    }
    try {
        const existed = await Exam.findOne({
            code: newExam.code,
            mon: payload.mon,
            de: payload.de,
            khoi: payload.khoi,
        })
        if (existed?.code) {
            return setResponseStatus(event, 409, 'Record is Existed')
        }
        await Exam.create(newExam)
        return newExam
    } catch (error) {
        console.log('error', error)
        return setResponseStatus(event, 404, 'Not created')
    }
})
