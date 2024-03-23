<script setup lang="ts">
import { ItemNav } from '../atoms'
</script>

<template>
    <UCard class="h-full !max-h-[100dvh] max-w-[30%] w-64" padding="0">
        <img
            src="https://feapeec.stripocdn.email/content/guids/CABINET_0f006e71e94d38d98d201ca1a4dc5ebab341c121e95d797b1062e23ebdcd3b19/images/logohethonggiaoducnqhxanh_cbn.png"
            alt=""
            class="w-[140px] m-auto"
        />
        <div class="mt-5 flex flex-col gap-3 overflow-y-auto h-[80vh] no-scrollbar">
            <h3 class="font-normal text-gray-600 text-xs">MAIN MENU</h3>
            <div class="flex flex-col gap-2">
                <ItemNav href="/" name="Chấm chữa bài" />

                <ItemNav href="/hocvien" name="Danh sách học viên" />
                <ItemNav href="/quanlylop" name="Danh sách lớp" />
            </div>
            <h3 class="font-normal text-gray-600 text-xs">QUẢN LÝ ĐÁP ÁN</h3>
            <ItemNav href="/quanlydapan/toan" name="Môn Toán" />
            <ItemNav href="/quanlydapan/ly" name="Môn Lý" />
            <ItemNav href="/quanlydapan/hoa" name="Môn Hóa" />
            <ItemNav href="/quanlydapan/anh" name="Môn Anh" />
            <ItemNav href="/quanlydapan/van" name="Môn Văn" />
            <ItemNav href="/quanlydapan/sinh" name="Môn Sinh" />
            <ItemNav href="/quanlydapan/dgnl" name="Đánh giá năng lực(ĐGNL)" />
            <!-- <ItemNav href="/quanlydapan/danhgia" name="Đánh giá năng lực" /> -->
        </div>
    </UCard>
</template>

<style scoped></style>
