<script setup>
import Error from '@/components/Error.vue';
import Loading from '@/components/Loading.vue';
import { useAuthStore } from '@/store/auth';
import CustomApi from '@/utils/api';
import { useQuery } from '@tanstack/vue-query';

const authStore = useAuthStore()

const fetchData = async () => {
	const { data } = await CustomApi.get(`/user`, {
		headers: {
			Authorization: `Token ${authStore.token}`
		}
	});
	return data;
}

const { data, isLoading, error } = useQuery({
	queryKey: ["user"],
	queryFn: fetchData,
});
</script>
<template>
	<h1>Page Profile</h1>

	<div v-if="isLoading">
		<Loading />
	</div>
	<div v-else-if="error">
		<Error />
	</div>
	<div v-else class="my-3">
		<div class="card card-border border-warning w-full">
			<div class="card-body">
				<div class="flex gap-5">
					<div>
						<div v-if="data.user.image" class="avatar">
							<div class="w-24 rounded-full">
								<img :src="data.user.image" />
							</div>
						</div>
						<div v-else class="avatar avatar-placeholder">
							<div class="bg-warning text-warning-content w-24 rounded-full">
								<span class="text-5xl font-bold">{{ data.user.username ? data.user.username[0].toUpperCase() : ''
								}}</span>
							</div>
						</div>
					</div>
					<div>
						<h2 class="card-title">{{ data.user.username }}</h2>
						<p v-if="data.user.bio">{{ data.user.bio }}</p>
						<p v-else class="text-gray-500 italic">Tidak ada bio yang tersedia</p>
						<div class="card-actions mt-3">
							<RouterLink :to="{ name: 'update-profile' }" class="btn btn-outline btn-warning btn-sm">
								Update Profile
							</RouterLink>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>