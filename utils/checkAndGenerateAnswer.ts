export const checkAndGenerateAnswer = (excercies: any, response: any) => {
    const incorrect = response.filter((item: any) => {
        const index = item['STT']
        const res = excercies[index]

        return item['Đáp Án'] !== res
    })
    return incorrect
}
