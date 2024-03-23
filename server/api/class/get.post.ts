import { Student } from '~~/server/models/student.model'

export default defineEventHandler(async (event) => {
    const payload: any | null = await readBody(event)
    const area = payload.AREA
    const coso = payload.COSO

    try {
        const uniqueCombinations = await Student.aggregate([
            {
                $match: {
                    AREA: area,
                    COSO: coso,
                },
            },
            {
                $group: {
                    _id: {
                        KHOI: '$KHOI',
                        CLASS: '$CLASS',
                        COSO: '$COSO',
                        AREA: '$AREA',
                    },
                },
            },
        ])

        if (uniqueCombinations.length === 0) {
            return setResponseStatus(event, 404, 'Not Found')
        }

        return uniqueCombinations.map((combination) => combination._id)
    } catch (error) {
        console.error('Error retrieving unique combinations:', error)
        return setResponseStatus(event, 500, 'Internal Server Error')
    }
})
