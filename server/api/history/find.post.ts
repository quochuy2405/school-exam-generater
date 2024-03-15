import { History } from '~/server/models/history.model'

export default defineEventHandler(async (event) => {
    const payload: any | null = await readBody(event)
    const SBD = payload.SBD

    const history = await History.find({ SBD })

    return history
})
