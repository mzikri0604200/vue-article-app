<script setup>
import Loading from '@/components/Loading.vue';
import Error from '@/components/Error.vue';
import ProfileForm from '@/components/ProfileForm.vue';
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
	<h1 class="text-lg mb-3 font-semibold">Update Profile Form</h1>
	<div v-if="isLoading">
		<Loading />
	</div>
	<div v-else-if="error">
		<Error />
	</div>
	<div v-else>
		<ProfileForm :isUpdate="true" :data="data" />
	</div>
</template>