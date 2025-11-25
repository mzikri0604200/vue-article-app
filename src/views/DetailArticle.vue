<script setup>
import Error from '@/components/Error.vue';
import Loading from '@/components/Loading.vue';
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
let route = useRoute();

const fetchData = async () => {
  const { data } = await customApi.get(`/articles/${route.params.slug}`);
  console.log(data);

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
    <p>Slug: {{ data?.slug }}</p>
    <p>{{ data?.title }}</p>
  </div>
</template>