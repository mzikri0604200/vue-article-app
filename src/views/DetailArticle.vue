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
  <div v-else>
    <h1>Detail Article</h1>
    <div class="my-4">
      <h2 class="text-4xl text-info font-bold">{{ data.article?.title }}</h2>
      <small>{{ data.article?.description }}</small>
    </div>
    <p>{{ data.article?.body }}</p>
    <p>{{ data.article?.author?.username }}</p>
  </div>
</template>