<script setup>
import { useAuthStore } from '@/store/auth';
import CustomApi from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { ref } from 'vue';

const props = defineProps({
	idSlug: {
		type: String,
		required: true
	}
})

const queryClient = useQueryClient()
const authStore = useAuthStore()

const comment = ref('')

const createOrUpdateCommentMutation = useMutation({
	mutationFn: async () => {
		try {
			const response = await CustomApi.post(
				`/articles/${props.idSlug}/comments`,
				{
					comment: {
						body: comment.value.trim()
					}
				},
				{
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Token ${authStore.token}`
					}
				}
			);
			return response.data;
		} catch (error) {
			console.error('Error detail:', {
				message: error.message,
				response: error.response?.data,
				status: error.response?.status,
				config: {
					url: error.config?.url,
					method: error.config?.method,
					data: error.config?.data,
					headers: error.config?.headers
				}
			});
			throw error;
		}
	},
	onSuccess: () => {
		comment.value = '';
		queryClient.invalidateQueries({
			queryKey: ['articleDataDetail']
		});
	},
	onError: (error) => {
		alert(error.response?.data?.message || 'Gagal mengirim komentar. Silakan coba lagi.');
	}
})

const handleSubmit = () => {
	createOrUpdateCommentMutation.mutate();
}
</script>

<template>
	<form @submit.prevent="handleSubmit">
		<fieldset class="fieldset bg-base-200 border-info/50 rounded-box w-full border p-4 my-5">
			<textarea class="textarea h-24 w-full mb-2" v-model="comment" placeholder="Masukan komentar"></textarea>
			<div class="flex justify-end">
				<button class="btn btn-info btn-sm">Submit</button>
			</div>
		</fieldset>
	</form>
</template>