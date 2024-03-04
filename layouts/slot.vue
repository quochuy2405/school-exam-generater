<script setup lang="ts">
import { NavBar } from '@/components/organisms'
</script>
<template>
    <div class="flex gap-2 w-screen h-screen p-3 overflow-hidden">
        <NavBar />
        <div class="h-full px-3 w-full flex-1 overflow-y-hidden">
            <slot></slot>
        </div>
    </div>
    
</template>
