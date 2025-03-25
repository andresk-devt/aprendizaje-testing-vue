<script setup>
const props = defineProps({
  item: Object,
});
</script>

<template>
  <li class="border-2 border-gray-100 rounded-lg">
    <strong>ID: </strong> <span>{{ item.id }}</span>
    <br />
    <strong>Title: </strong> <span>{{ item.title }}</span>
  </li>
</template>
