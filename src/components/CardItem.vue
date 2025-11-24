<script setup>
import { RouterLink } from 'vue-router';

defineProps({
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
	}
});
</script>

<template>
	<div class="card border bg-white/10 border-white/70 w-96 rounded-lg shadow-md">
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
			<div class="text-end">
				<span class="text-xs text-gray-300 italic">{{ new Date(item.created).toDateString() }}</span>
			</div>

		</div>
	</div>
</template>