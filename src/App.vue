<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue';
import { useAuthStore } from './stores/auth'
import apiService from '@/ApiService'

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from 'axios';

declare global {
        interface Window {
            Pusher: any; 
            Echo: Echo; 
        }
    }
    const authStore = useAuthStore();
    window.Pusher = Pusher;

    window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    authorizer: (channel:any, options: any) => {
        return {
            authorize: (socketId:any, callback:Function) => {
              apiService.post('/broadcasting/auth', {
                    socket_id: socketId,
                    channel_name: channel.name
                }, {
                    headers: {
                        'Authorization': `Bearer ${authStore.token}`,
                        // 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    }
                })
                .then(response => {
                    console.log("Authorization successful:", response);
                    callback(false, response.data);

                    // console.log("Show response:", response)
                    // callback(false, response.data);
                })
                .catch(error => {
                    // console.error("Authorization failed:", error);
                    // callback(true, { error: 'Authorization failed' });

                    console.log("error:", error);
                    callback(true, error)
                })
            }    
        }
    },
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss']
    });

onMounted(async() => {
  authStore.initializeAuth();

  // window.Echo.private('channel1')
  //       .listen('MessageSent', (event:any) => {
  //         console.log(event);
  //   });
})
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
