export const useForm = () => {
    return useState('state', () => 'hehe')
}
type UseHookApiType = {
    url: string
    defaultValue?: any
    server?: boolean
    lazy?: boolean
}
