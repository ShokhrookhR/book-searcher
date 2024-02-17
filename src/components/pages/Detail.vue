<script setup lang="ts">
import { onMounted } from 'vue';
import { NCard, NImage } from 'naive-ui';
import { useBookSearcher } from '@/composables/useBookSearcher.js';
import get from 'lodash.get';
const { detail, getBookById, route } = useBookSearcher();

onMounted(async () => {
  await getBookById(route.params.id);
});
</script>
<template>
  <div>
    <NCard :title="get(detail, 'title')">
      <NImage :src="get(detail.imageLinks, 'thumbnail')" />
    </NCard>
  </div>
</template>

<style scoped></style>
