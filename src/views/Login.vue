<template>
    <div class="flex flex-col justify-center items-center mt-48">
        <h1 class="text-4xl font-extrabold">LOGIN</h1>
        <div class="w-full max-w-xs">
            <form @submit.prevent="handleLogin" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <span class="text-xs text-red-700" id="formHelp">{{ loginError }}</span>
                <div class="identity-input mb-4">
                    <label for="identity" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input id="identity"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" placeholder="Username" aria-describedby="usernameHelp" v-model="username" required
                    />
                    <span class="text-xs text-red-700" id="emailHelp">{{ usernameError }}</span>
                </div>
                
                <div class="password-input mb-6">
                    <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input aria-describedby="passwordHelp" v-model="password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="*******" required
                    />
                    <span class="text-xs text-red-700" id="passwordHelp">{{ passwordError }}</span>
                </div>
                
                <div class="flex items-center justify-between">
                    <button class="bg-blue-600 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Login
                    </button>
                </div>
            </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useAuthStore } from '../stores/auth'
  import { useRouter } from 'vue-router'
  
  const authStore = useAuthStore()
  const router = useRouter()
  
  const username = ref('')
  const password = ref('')
  const loginError = ref('')
  const usernameError = ref('')
  const passwordError = ref('')
  
  const handleLogin = async () => {
    usernameError.value = ''
    passwordError.value = ''
  
    if (!username.value) {
      usernameError.value = 'Username is required'
      return
    }
  
    if (!password.value) {
      passwordError.value = 'Password is required'
      return
    }
  
    const res = await authStore.login(username.value, password.value)
  
    if (res.status) {
      // Redirect to dashboard or home page
      console.log("redirect to dashboard");
      router.push('/');
    } else {
      // Show error message
      loginError.value = res.message ?? "Wrong email or Password";
    }
  }
  </script>