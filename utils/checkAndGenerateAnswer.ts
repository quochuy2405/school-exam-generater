export const checkAndGenerateAnswerRaw = (excercies: any, response: any) => {
    const incorrect = Object.values(response.excercies).filter((item: any) => {
        const index = item['STT']
        const res = excercies[index]

        return item['Đáp Án'] !== res
    })
    return incorrect
}

export const checkAndGenerateAnswer = (excercies: any, response: any) => {
    console.log('response', response)
    const incorrect = Object.values(response.excercies).filter((item: any) => {
        const index = item['STT']
        const res = excercies[index]

        return item['Đáp Án'] !== res
    })
    return incorrect
}
