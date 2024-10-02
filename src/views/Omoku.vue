<template>
    <AppHeader />
    <div class="p-4 max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold mb-4">Omoku Power Station</h1>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted, onUnmounted } from 'vue';
    import VueApexCharts from 'vue3-apexcharts';

    import AppHeader from '@/components/Header.vue'
    import { useAuthStore} from '@/stores/auth';
    import apiService from '@/ApiService'

    onMounted(async() => {
        console.log("mounted");
        window.Echo.private('omokugs-pv')
        .listen('.Publish', (event: any) => {
            try {
                console.log('Received event:', event);
            } catch (error) {
                console.error('Error processing event:', error);
            }
        });
    })

    // onUnmounted(() => {
    //     window.Echo.leave('omokugs-pv'); // leave the channel
    //     console.log('Stopped listening to the channel');
    // });
</script>