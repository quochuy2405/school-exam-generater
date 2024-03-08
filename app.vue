<template>
    <div>
        <UNotifications  />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
}

.layout-enter-active {
    animation-name: fade-in;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}
.layout-leave-active {
    animation-name: fade-out;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}

.layout-leave-to {
    animation-name: fade-out;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}
.layout-enter-from {
    animation-name: fade-in;
    animation-duration: 1s;
    animation-fill-mode: forwards;
}
</style>
