<script setup>
import { useAuthStore } from '@/store/auth';
import CustomApi from '@/utils/api';
import { useMutation } from '@tanstack/vue-query';
import { reactive, ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
	isUpdate: {
		type: Boolean,
		default: false
	},
	data: {
		type: Object,
	}
})

const authStore = useAuthStore()
const router = useRouter()

const articleData = reactive({
	article: {
		title: '',
		description: '',
		body: '',
		tagList: [],
	}
})

const newTag = ref('')
function addTag() {
	articleData.article.tagList.push(newTag.value.trim())
	newTag.value = ''
}
function removeTag(tag) {
	articleData.article.tagList = articleData.article.tagList.filter(t => t !== tag)
}

const handleSubmit = () => {
	if (props.isUpdate) {
		updateArticleMutation.mutate()
	} else {
		createArticleMutation.mutate()
	}
}

const createArticleMutation = useMutation({
	mutationFn: async () => {
		const articlePayload = {
			title: articleData.article.title,
			description: articleData.article.description,
			body: articleData.article.body,
			tagList: [...articleData.article.tagList]
		}

		return await CustomApi.post('/articles', { article: articlePayload }, {
			headers: {
				'Authorization': `Token ${authStore.token}`
			}
		})
	},
	onSuccess: () => {
		router.push({ name: 'article-dashboard' })
		alert('Article created successfully!')
	},
	onError: (error) => {
		console.error('Error creating article:', error.response?.data || error.message)
		alert('Failed to create article. Please check the console for more details.')
	}
})


const updateArticleMutation = useMutation({
	mutationFn: async () => {
		const articlePayload = {
			title: articleData.article.title,
			description: articleData.article.description,
			body: articleData.article.body,
			tagList: [...articleData.article.tagList]
		}

		const article = props.data.article || props.data;
		return await CustomApi.put(`/articles/${article.slug}`,
			{ article: articlePayload },
			{
				headers: {
					'Authorization': `Token ${authStore.token}`
				}
			}
		)
	},
	onSuccess: () => {
		router.push({ name: 'article-dashboard' })
		alert('Article updated successfully!')
	},
	onError: (error) => {
		console.error('Error updating article:', error.response?.data || error.message)
		alert('Failed to update article. Please check the console for more details.')
	}
})

const initializeForm = () => {
	if (props.isUpdate && props.data) {
		const article = props.data.article || props.data;
		if (article) {
			articleData.article.title = article.title || '';
			articleData.article.description = article.description || '';
			articleData.article.body = article.body || '';
			articleData.article.tagList = Array.isArray(article.tagList) ? [...article.tagList] : [];
			console.log('Form initialized with data:', articleData.article);
		}
	}
};
onMounted(initializeForm);

watch(() => props.data, (newData) => {
	if (newData) {
		initializeForm();
	}
}, { immediate: true });
</script>

<template>
	<form @submit.prevent="handleSubmit">
		<fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-4">
			<legend class="fieldset-legend">{{ props.isUpdate ? 'Update Article' : 'Create Article' }}</legend>

			<div class="flex gap-3 flex-col">
				<div>
					<label class="label">Title</label>
					<input type="text" class="input w-full" required v-model.trim="articleData.article.title"
						placeholder="Enter Title" />
				</div>

				<div>
					<label class="label">Description</label>
					<input type="text" class="input w-full" required v-model.trim="articleData.article.description"
						placeholder="Enter Description" />
				</div>

				<div>
					<label class="label">Body Content Article</label>
					<div>
						<textarea class="textarea h-24 w-full" required v-model.trim="articleData.article.body"
							placeholder="Enter Body Content"></textarea>
					</div>
				</div>
				<div>
					<label class="label">Tags</label>
					<input type="text" class="input w-full" v-model.trim="newTag" @change="addTag"
						@keypress.enter.prevent="addTag" placeholder="Enter Tags" />
					<div class="tag-list mt-2">
						<span v-for="tag in articleData.article.tagList" :key="tag" class="badge badge-soft badge-warning">
							<font-awesome-icon icon="fa-regular fa-circle-xmark" @click="removeTag(tag)"
								@keypress.enter="removeTag(tag)" class="cursor-pointer" />
							{{ tag }}
						</span>
					</div>
				</div>
				<div class="justify-end gap-2 flex">
					<RouterLink :to="{ name: 'article-dashboard' }" class="btn btn-outline btn-error">Cancel</RouterLink>
					<button type="submit" class="btn btn-warning">{{ props.isUpdate ? 'Update Article' : 'Create Article'
					}}</button>
				</div>
			</div>
		</fieldset>
	</form>
</template>