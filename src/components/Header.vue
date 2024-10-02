<template>
    <header class="flex mt-1 h-48 w-full border border-gray-200 dark:border-gray-700">
        <div class="flex flex-col mt-10 w-full">
            <div class="flex flex-row">
                <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
                IOT APP
            </div>
            <div class="flex mt-4 text-center justify-between w-full border border-gray-600">
                <nav class="flex flex-row space-x-12">
                    <RouterLink to="/">Home</RouterLink>
                    <RouterLink to="/show">Show</RouterLink>
                    <RouterLink to="/omoku">Omoku Power Station</RouterLink>
                </nav>
                <button @click="handleLogout">LOGOUT</button>
            </div>
        </div>
  </header>

</template>

<script setup lang="ts">
    import { RouterLink, RouterView, useRouter } from 'vue-router';
    import { useAuthStore} from "@/stores/auth";

    const router = useRouter();
    const authStore = useAuthStore();

    const handleLogout = async () => {
        console.log("logout");
        authStore.logout();
        router.push('/login');
    }
</script>