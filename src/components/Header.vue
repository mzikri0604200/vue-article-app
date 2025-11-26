<script setup>
import { useAuthStore } from '@/store/auth';
import { useMutation } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
const authStore = useAuthStore()
const router = useRouter()

const LogoutMutation = useMutation({
  mutationFn: async () => {
    authStore.removeAuth()
  },
  onSuccess: () => {
    router.push({ name: 'Login' })
  },
  onError: (err) => {
    console.log(err);
  }
})

const handleLogout = () => {
  LogoutMutation.mutate()
}

</script>

<template>
  <header>
    <div class="navbar bg-base-100 shadow-sm fixed z-10 top-0 left-0 right-0">
      <div class="navbar-start">
        <div class="dropdown">
          <!-- Mobile -->
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabindex="-1" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a>Item 1</a></li>
            <li>
              <a>Parent</a>
              <ul class="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <a class="btn btn-ghost text-xl">Logo</a>
      </div>
      <!-- PC -->
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><a>Item 1</a></li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul class="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
                <li><span class="text-error" @click="handleLogout">Logout</span></li>
              </ul>
            </details>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <div class="navbar-end">
        <div v-if="authStore.token">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost rounded-field">{{ authStore.user?.username }}</div>
            <ul tabindex="-1" class="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
              <li>
                <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
              </li>
              <li><a>Profile</a></li>
              <li><span class="text-error" @click="handleLogout">Logout</span></li>
            </ul>
          </div>
        </div>
        <div v-else>
          <RouterLink class="btn btn-light" :to="{ name: 'Login' }">Login</RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>
