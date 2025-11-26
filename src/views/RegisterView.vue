<script setup>
import AuthForm from '@/components/AuthForm.vue';
</script>

<template>
	<div class="flex items-center justify-center">
		<div class="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md">
			<!-- Decorative Header -->
			<div class="bg-linear-to-r from-orange-400 to-orange-500 p-6 text-center relative">
				<div class="absolute -top-10 -left-10 w-20 h-20 bg-orange-300 rounded-full opacity-20"></div>
				<div class="absolute -bottom-5 -right-5 w-24 h-24 bg-orange-200 rounded-full opacity-20"></div>

				<h2 class="text-2xl font-bold text-white">Register to your account</h2>
				<p class="text-orange-100 mt-1">Have an account?</p>
			</div>
			<div class="p-8">
				<AuthForm :isRegister="true" />
			</div>
		</div>
	</div>
</template>