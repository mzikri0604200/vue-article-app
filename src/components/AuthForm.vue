<script setup>
import CustomApi from '@/utils/api';
import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { RouterLink, useRoute, useRouter } from 'vue-router';

const router = useRouter()
const authStore = useAuthStore()

const props = defineProps({
	isRegister: {
		type: Boolean,
		default: false
	}
})

const email = ref('')
const username = ref('')
const password = ref('')

const AuthMutation = useMutation({
	mutationFn: async () => {
		// Register
		if (props.isRegister) {
			await CustomApi.post('/users', {
				user: {
					username: username.value,
					email: email.value,
					password: password.value
				}
			});
		}

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
	<!-- Email & Password Form -->
	<form class="space-y-5" @submit.prevent="AuthSubmitHandle">
		<!-- Username Field -->
		<div class="input-field bg-gray-50 border border-gray-300 rounded-lg" v-if="props.isRegister">
			<label for="username" class="block text-xs text-gray-500 px-4 pt-3">Username</label>
			<div class="flex items-center px-4 pb-2">
				<font-awesome-icon icon="fa-solid fas fa-user" class="text-gray-400 mr-2" />
				<input type="text" id="username" v-model="username" class="w-full py-2 outline-none text-black bg-transparent"
					placeholder="jhon_doe">
			</div>
		</div>

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
			{{ props.isRegister ? "Register" : "Login" }}
		</button>
	</form>

	<!-- Sign Up Link -->
	<div v-if="props.isRegister" class="mt-6 text-center">
		<p class="text-gray-600">Already have an account?
			<RouterLink :to="{ name: 'Login' }" class="text-orange-400 hover:text-orange-500 font-medium hover:underline">
				Login</RouterLink>
		</p>
	</div>
	<div v-else class="mt-6 text-center">
		<p class="text-gray-600">Don't have an account?
			<RouterLink :to="{ name: 'Register' }" class="text-orange-400 hover:text-orange-500 font-medium hover:underline">
				Sign up</RouterLink>
		</p>
	</div>
</template>