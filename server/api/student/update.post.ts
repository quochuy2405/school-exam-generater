import { Student } from '~/server/models/student.model'

export default defineEventHandler(async (event) => {
    const payload: any | null = await readBody(event)
    const dataUpdate = {
        ...payload,
    }
    try {
        await Student.updateOne(
            {
                SBD: dataUpdate.SBD,
                CLASS: dataUpdate.CLASS,
                MON: dataUpdate.MON,
                KHOI: dataUpdate.KHOI,
                AREA: dataUpdate.AREA,
            },
            { $set: dataUpdate }
        )
        return dataUpdate
    } catch (error) {
        console.log('error', error)
        return setResponseStatus(event, 404, 'Not updated')
    }
})
