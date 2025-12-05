<script setup>
import Error from '@/components/Error.vue';
import Loading from '@/components/Loading.vue';
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store/auth';
const authStore = useAuthStore();
import CustomApi from '@/utils/api';
let route = useRoute();

const fetchData = async () => {
  const { data } = await CustomApi.get(`/articles/${route.params.slug}`, {
    headers: {
      'Authorization': `Token ${authStore.token}`
    }
  });
  return data;
}

const { data, isLoading, error } = useQuery({
  queryKey: ["article"],
  queryFn: fetchData,
});
</script>

<template>
  <div v-if="isLoading">
    <Loading />
  </div>
  <div v-else-if="error">
    <Error />
  </div>
  <div v-else-if="!authStore.token">
    <div class="alert alert-warning gap-1">
      Please login to view this article.<RouterLink :to="{ name: 'Login' }" class="btn px-0 btn-link">Login</RouterLink>
    </div>
  </div>
  <div v-else>
    <div class="flex gap-4 items-center">
      <RouterLink :to="{ name: 'home' }" class="btn btn-sm btn-warning btn-outline"><font-awesome-icon
          icon="fa-solid fas fa-arrow-left" /> Back</RouterLink>
      <h1>Detail Article</h1>
    </div>
    <div class="my-4">
      <h2 class="text-4xl text-warning font-bold mb-1">{{ data.article?.title }}</h2>
      <div class="flex gap-1.5 items-center">
        <small class="text-base-content/50">{{ data.article?.description }}</small>
        <span class="text-base-content/50">|</span>
        <small class="text-info/70">Published on {{ new Date(data.article?.created).toDateString() }}</small>
      </div>
    </div>
    <p>{{ data.article?.body }}</p>
    <p>{{ data.article?.author?.username }}</p>
    <hr class="h-px my-5 bg-warning/30 border-0">
    <div class="flex mb-3">
      <span class="me-3">Tags:</span>
      <div class="flex gap-3">
        <span v-for="tag in data.article?.tagList" :key="tag" class="badge badge-soft badge-warning">
          {{ tag }}
        </span>
      </div>
    </div>

  </div>
</template>