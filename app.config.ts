export default defineAppConfig({
    ui: {
        slideover: {
            width: 'w-screen lg:max-w-[80%]',
        },
        table: {
            wrapper: 'relative overflow-x-auto flex-1 overflow-auto',
            base: 'w-full relative flex-1 h-full',
            thead: 'sticky top-0 shadow bg-white',
            td: {
                base: 'whitespace-normal break-words',
                padding: 'px-4 py-4',
                color: 'text-gray-500 dark:text-gray-400',
                font: '',
                size: 'text-sm',
            },
        },
    },
})
