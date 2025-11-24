<script setup>
import { useQuery } from "@tanstack/vue-query";
import customApi from "@/utils/api";

const fetchData = async () => {
  const { data } = await customApi.get("/article");
  return data;
}

const { data, isLoading, error } = useQuery({
  queryKey: ["articles"],
  queryFn: fetchData,
});
</script>

<template>
  <main>
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <section v-else>
      <h1 class="text-2xl font-bold mb-6">List of latest articles</h1>
      <div class="card border bg-white/10 border-white/70 w-96 rounded-lg shadow-md" v-for="article in data?.articles"
        :key="article.id">
        <div class="card-body">
          <div class="mb-3">
            <span class="text-xs text-gray-300">Write by <b>{{ article.author.username }}</b></span>
            <h2 class="card-title text-xl">
              {{ article.title }}
            </h2>
            <span class="text-xs text-gray-300 italic">{{ new Date(article.created).toDateString() }}</span>
          </div>
          <p>{{ article.description.substring(0, 50) }}</p>
          <div class="card-actions justify-start mb-3">
            <div class="badge badge-soft badge-dark" v-for="tag in article.tagList" :key="tag">{{ tag }}</div>
          </div>
          <div>
            <button class="btn btn-block btn-outline btn-white btn-xs">Read More</button>
          </div>

        </div>
      </div>
      <div class="mt-4">
        <button class="btn btn-warning">Show all articles</button>
      </div>
    </section>
  </main>
</template>
