<script setup>
import axios from "axios";
import RequestItem from "./RequestItem.vue";
import { ref, onMounted } from "vue";

const todoData = ref(null);

const getTodoList = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  todoData.value = response.data;
};

onMounted(async () => {
  await getTodoList();
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Request list</h1>
    <ul
      class="w-full m-auto mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <RequestItem
        v-for="(item, index) in todoData"
        :key="index"
        :item="item"
      />
    </ul>
  </div>
</template>
