<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore()
const router = useRouter()
const isOpen = ref(false)

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

const toggleDrawer = () => {
	isOpen.value = !isOpen.value
}
const closeDrawer = () => {
	isOpen.value = false
}
</script>

<template>
	<div class="flex h-screen">
		<div :class="['bg-base-200 w-64 space-y-4 transition-transform duration-300',
			isOpen ? 'translate-x-0' : '-translate-x-full',
			'fixed z-40 h-full lg:static lg:translate-x-0'
		]">
			<h2 class="text-2xl font-bold m-5">{{ authStore.user?.username }}</h2>
			<ul class="menu bg-base-200 rounded-box w-56">
				<li>
					<h2 class="menu-title">Dashboard</h2>
					<ul>
						<li>
							<RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
						</li>
					</ul>
				</li>
			</ul>
		</div>

		<!-- Mobile -->
		<div v-if="isOpen" class="fixed inset-0 z-30 bg-black bg-opacity-40 lg:hidden" @click="closeDrawer" />
		<!-- Main Content -->
		<div class="flex-1 flex flex-col min-h-screen">
			<div class="navbar bg-base-200 shadow-sm">
				<div class="flex-none lg:hidden">
					<button class="btn btn-square btn-info" @click="toggleDrawer">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
							class="inline-block h-5 w-5 stroke-current">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
							</path>
						</svg>
					</button>
				</div>
				<div class="flex-1 font-bold text-2xl px-2">
					<RouterLink :to="{ name: 'home' }" class="btn btn-ghost text-xl">Public</RouterLink>
				</div>
				<div class="flex-none">
					<button class="btn btn-sm text-white btn-error" @click="handleLogout">
						Logout
					</button>
				</div>
			</div>
			<main class="p-6 flex-1 overflow-y-auto">
				<RouterView></RouterView>
			</main>
		</div>

	</div>
	<!-- <RouterView /> -->
</template>