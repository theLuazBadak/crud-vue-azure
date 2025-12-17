<script setup lang="ts">

import { useMicrofrontendStore } from '@/stores/microfrontend';
const mfStore = useMicrofrontendStore()

</script>

<template>
    <div class="w-full h-full">
        <iframe
        v-if="mfStore.currentUrl"
        :src="mfStore.currentUrl" 
        class="w-full h-[calc(100vh-4rem)] border-0"
        frameborder="0">
        </iframe>

        <div v-else>
            <h1 class="text-2xl font-semibold mb-4">Dashboard</h1>
            <p>Bienvenidos. Aquí irá el panel principal</p>
        </div>

    </div>
</template>