import { Student } from '~/server/models/student.model'

export default defineEventHandler(async (event) => {
    const payload: any | null = await readBody(event)

    const newStudent = [...payload]
    try {
        await Student.insertMany(newStudent)
        return newStudent
    } catch (error) {
        console.log('error', error)
        return setResponseStatus(event, 404, 'Not created')
    }
})
