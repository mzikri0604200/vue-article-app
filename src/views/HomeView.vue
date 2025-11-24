<script setup>
import { useQuery } from "@tanstack/vue-query";
import customApi from "@/utils/api";
import Loading from "@/components/Loading.vue";
import Error from "@/components/Error.vue";
import CardItem from "@/components/CardItem.vue";

const fetchData = async () => {
  const { data } = await customApi.get("/articles");
  return data;
}

const { data, isLoading, error } = useQuery({
  queryKey: ["articles"],
  queryFn: fetchData,
});
</script>

<template>
  <main>
    <div v-if="isLoading">
      <Loading />
    </div>
    <div v-else-if="error">
      <Error />
    </div>
    <section v-else>
      <h1 class="text-2xl font-bold mb-6">List of latest articles</h1>
      <CardItem v-for="article in data?.articles" :key="article.id" :item="article" />
      <div class="mt-4">
        <button class="btn btn-warning">Show all articles</button>
      </div>
    </section>
  </main>
</template>
