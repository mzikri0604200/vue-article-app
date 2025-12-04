<script setup>
import ArticleForm from '@/components/ArticleForm.vue';
import CustomApi from '@/utils/api';
import { useQuery } from '@tanstack/vue-query';
import { useAuthStore } from '@/store/auth';
import { useRoute } from 'vue-router';

const authStore = useAuthStore();
const route = useRoute();

const fetchData = async () => {
	try {
		const { data } = await CustomApi.get(`/articles/${route.params.slug}`, {
			headers: {
				'Authorization': `Token ${authStore.token}`
			}
		});
		return data;
	} catch (error) {
		console.error('Error fetching article:', error);
		throw error;
	}
}

const { isLoading, isError, error, data } = useQuery({
	queryKey: ['article'],
	queryFn: fetchData,
});
</script>

<template>
	<div v-if="isLoading" class="flex justify-center items-center h-64">
		<span class="loading loading-spinner loading-lg"></span>
	</div>
	<div v-else-if="isError" class="alert alert-error">
		Error loading article: {{ error.message }}
	</div>
	<ArticleForm v-else :isUpdate="true" :data="data" />
</template>