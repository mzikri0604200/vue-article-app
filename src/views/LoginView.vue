<script setup>
import CustomApi from '@/utils/api';
import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const authStore = useAuthStore()
const email = ref('')
const password = ref('')

const AuthMutation = useMutation({
	mutationFn: async () => {
		// Login
		const { data } = await CustomApi.post('/users/login', {
			user: {
				email: email.value,
				password: password.value,
			}
		});


		// GetUser
		const user = await CustomApi.get(`/user`, {
			headers: {
				Authorization: `Token ${data.user.token}`
			}
		});

		authStore.setAuth(data.user.token, user.data.user)
	},
	onSuccess: () => {
		router.replace({ name: 'home' })
	},
	onError: (err) => {
		console.log(err);
	}
})

const AuthSubmitHandle = () => {
	AuthMutation.mutate();
}
</script>

<template>
	<div class="flex items-center justify-center">
		<div class="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md">
			<!-- Decorative Header -->
			<div class="bg-linear-to-r from-orange-400 to-orange-500 p-6 text-center relative">
				<div class="absolute -top-10 -left-10 w-20 h-20 bg-orange-300 rounded-full opacity-20"></div>
				<div class="absolute -bottom-5 -right-5 w-24 h-24 bg-orange-200 rounded-full opacity-20"></div>

				<h2 class="text-2xl font-bold text-white">Welcome Back</h2>
				<p class="text-orange-100 mt-1">Sign in to your account</p>
			</div>

			<!-- Form Content -->
			<div class="p-8">
				<!-- Email & Password Form -->
				<form class="space-y-5" @submit.prevent="AuthSubmitHandle">
					<!-- Email Field -->
					<div class="input-field bg-gray-50 border border-gray-300 rounded-lg">
						<label for="email" class="block text-xs text-gray-500 px-4 pt-3">Email Address</label>
						<div class="flex items-center px-4 pb-2">
							<font-awesome-icon icon="fa-solid fas fa-envelope" class="text-gray-400 mr-2" />
							<input type="email" id="email" v-model="email" class="w-full py-2 outline-none text-black bg-transparent"
								placeholder="you@example.com">
						</div>
					</div>

					<!-- Password Field -->
					<div class="input-field bg-gray-50 border border-gray-300 rounded-lg">
						<label for="password" class="block text-xs text-gray-500 px-4 pt-3">Password</label>
						<div class="flex items-center px-4 pb-2">
							<font-awesome-icon icon="fa-solid fas fa-lock" class="text-gray-400 mr-2" />
							<input type="password" id="password" v-model="password"
								class="w-full py-2 outline-none text-black bg-transparent" placeholder="••••••••">
							<button type="button" class="text-gray-400 hover:text-blue-500">
								<i class="fas fa-eye-slash"></i>
							</button>
						</div>
					</div>

					<!-- Remember & Forgot Password -->
					<div class="flex items-center justify-between">
						<div class="flex items-center">
							<input type="checkbox" id="remember"
								class="h-4 w-4 text-orange-600 bg-secondary rounded border-gray-300 focus:ring-orange-500">
							<label for="remember" class="ml-2 text-sm text-gray-600">Remember me</label>
						</div>
						<a href="#" class="text-sm text-orange-400 hover:text-orange-600 hover:underline">Forgot password?</a>
					</div>

					<!-- Submit Button -->
					<button type="submit"
						class="w-full bg-orange-400 hover:bg-orange-500 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-md">
						Sign In
					</button>
				</form>

				<!-- Sign Up Link -->
				<div class="mt-6 text-center">
					<p class="text-gray-600">Don't have an account?
						<a href="#" class="text-orange-400 hover:text-orange-500 font-medium hover:underline">Sign up</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>