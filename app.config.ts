export default defineAppConfig({
    ui: {
        slideover: {
            width: 'w-screen max-w-[80%]',
            translate: {
                base: 'translate-x-0',
                left: '-translate-x-full rtl:translate-x-full',
                right: 'translate-x-full rtl:-translate-x-full',
            },
            transition: {
                enter: 'transform transition ease-in-out duration-300',
                leave: 'transform transition ease-in-out duration-200',
            },
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
