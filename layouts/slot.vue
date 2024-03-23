<script setup lang="ts">
import '@/assets/css/hidden-scroll.css'
import { NavBar } from '@/components/organisms'
</script>
<template>
    <div class="md:hidden w-full h-screen flex items-center justify-center">
        <UButton> Ứng dụng hiện chỉ khả dụng trên ipad hoặc laptop</UButton>
    </div>
    <div class="hidden md:flex gap-2 w-screen h-screen p-3 overflow-hidden">
        <NavBar />
        <div class="h-full px-3 w-full flex-1 overflow-y-hidden">
            <slot></slot>
        </div>
    </div>
</template>
