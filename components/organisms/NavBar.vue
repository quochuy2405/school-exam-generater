<script setup lang="ts">
import { ItemNav } from '../atoms'
</script>

<template>
    <UCard class="h-full !max-h-[100dvh] max-w-[30%] w-64" padding="0">
        <div class="mt-5 flex flex-col gap-3">
            <h3 class="font-normal text-gray-600 text-xs">MAIN MENU</h3>
            <div class="flex flex-col gap-2">
                <ItemNav href="/" name="Chấm chữa bài" />

                <ItemNav href="/hocvien" name="Danh sách học viên" />
            </div>
            <h3 class="font-normal text-gray-600 text-xs">QUẢN LÝ ĐÁP ÁN</h3>
            <ItemNav href="/quanlydapan/toan" name="Môn Toán" />
            <ItemNav href="/quanlydapan/ly" name="Môn Lý" />
            <ItemNav href="/quanlydapan/hoa" name="Môn Hóa" />
            <ItemNav href="/quanlydapan/danhgia" name="Đánh giá năng lực" />
        </div>
    </UCard>
</template>

<style scoped></style>
