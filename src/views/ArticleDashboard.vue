<script setup>
import CardItem from '@/components/CardItem.vue';
import CustomApi from '@/utils/api';
import { useQuery } from '@tanstack/vue-query';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore()

const fetchData = async () => {
	// const { data } = await CustomApi.get('/articles?author=' + authStore.user?.username);
	const { data } = await CustomApi.get('/articles', {
		params: {
			author: authStore.user?.username
		},
		headers: {
			'Authorization': `Bearer ${authStore.token}`
		}
	});
	return data;
}

const { data, isLoading, error, refetch } = useQuery({
	queryKey: ['articles'],
	queryFn: fetchData,
});

const handleDeleteArticle = async (slug) => {
	if (confirm('Are you sure you want to delete this article?')) {
		await CustomApi.delete(`/articles/${slug}`, {
			headers: {
				'Authorization': `Bearer ${authStore.token}`
			}
		});
		refetch()
	}
	alert('Article deleted successfully!');
}
</script>

<template>
	<div class="flex justify-between items-center">
		<h1>Halaman Article Dashboard</h1>
		<RouterLink :to="{ name: 'create-article' }" class="btn btn-warning">Buat Article</RouterLink>
	</div>
	<div v-if="isLoading">
		Loading...
	</div>
	<div v-else-if="error">
		Error: {{ error.message }}
	</div>
	<div v-else class="mt-4">
		<div v-if="data?.articles?.length === 0" class="text-center py-8 bg-base-200 rounded-lg">
			<font-awesome-icon icon="fa-solid fas fa-newspaper fa-lg" size="3x" class="text-gray-400 mb-3" />
			<p class="text-sm text-gray-400">Anda belum membuat artikel apapun</p>
		</div>
		<div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			<CardItem v-for="article in data?.articles" :key="article.id" :item="article" :is-dashboard="true"
				@delete="handleDeleteArticle" />
		</div>
	</div>
</template>