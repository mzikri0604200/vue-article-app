<script setup>
import Error from '@/components/Error.vue';
import Loading from '@/components/Loading.vue';
import { useAuthStore } from '@/store/auth';
import CustomApi from '@/utils/api';
import { useQuery } from '@tanstack/vue-query';

const authStore = useAuthStore()
</script>
<template>
	<h1>Page Profile</h1>
	<div class="my-3">
		<div class="card card-border border-warning w-96">
			<div class="card-body">
				<h2 class="card-title">{{ authStore.user?.username }}</h2>
				<p v-if="authStore.user?.bio">{{ authStore.user.bio }}</p>
				<p v-else class="text-gray-500 italic">Tidak ada bio yang tersedia</p>
				<div class="card-actions mt-3">
					<button class="btn btn-warning btn-sm">Update Profile</button>
				</div>
			</div>
		</div>
	</div>
</template>