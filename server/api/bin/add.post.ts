import { Bin } from '~/server/models/bin.model'

export default defineEventHandler(async (event) => {
    const payload: any | null = await readBody(event)
    try {
        const existed = await Bin.findOne({
            ...payload,
        })
        if (existed) {
            return setResponseStatus(event, 409, 'Record is Existed')
        }
        await Bin.create(payload)
        return payload
    } catch (error) {
        console.log('error', error)
        return setResponseStatus(event, 404, 'Not created')
    }
})
