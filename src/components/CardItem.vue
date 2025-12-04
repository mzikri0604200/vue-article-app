<script setup>
import { RouterLink } from 'vue-router';
import { computed } from 'vue';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore()

const props = defineProps({
	item: {
		type: Object,
		required: true,
		validator: (value) => {
			return value &&
				typeof value === 'object' &&
				'id' in value &&
				'author' in value &&
				'title' in value &&
				'created' in value &&
				'description' in value &&
				'tagList' in value;
		}
	},
	isDashboard: {
		type: Boolean,
		default: false
	}
});

// Add this computed property
const isArticleAuthor = computed(() => {
	return authStore.user?.username === props.item?.author?.username;
});
</script>

<template>
	<div class="card border bg-white/10 border-white/70 w-full rounded-lg shadow-md">
		<div class="card-body">
			<div class="mb-3">
				<RouterLink :to="{ name: 'DetailArticle', params: { slug: item.slug } }">
					<h2 class="card-title text-xl">
						{{ item.title }}
					</h2>
				</RouterLink>
				<span class="text-xs text-gray-300">Write by <b>{{ item.author.username }}</b></span>
			</div>
			<p>{{ item.description.substring(0, 50) }}</p>
			<div class="card-actions justify-start mb-3">
				<div class="badge badge-soft badge-dark" v-for="tag in item.tagList" :key="tag">{{ tag }}</div>
			</div>
			<div class="text-end flex items-center justify-between">
				<span class="text-xs text-gray-300 italic">{{ new Date(item.created).toDateString() }}</span>
				<div class="flex gap-2" v-if="isArticleAuthor && isDashboard">
					<RouterLink :to="{ name: 'update-article', params: { slug: item.slug } }"
						class="btn btn-info btn-soft btn-xs">
						<font-awesome-icon icon="fa-solid fas fa-edit fa-lg" />
					</RouterLink>
					<button class="btn btn-error btn-soft btn-xs" @click="$emit('delete', item.slug)">
						<font-awesome-icon icon="fa-solid fas fa-trash fa-lg" />
					</button>
				</div>
			</div>

		</div>
	</div>
</template>