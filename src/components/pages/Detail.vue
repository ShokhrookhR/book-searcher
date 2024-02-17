<script setup lang="ts">
import { onMounted } from 'vue';
import { NCard, NImage } from 'naive-ui';
import { useBookSearcher } from '@/composables/useBookSearcher.ts';
import get from 'lodash.get';

const { detail, getBookById, route } = useBookSearcher();
const formatter = (list: string[]) =>
  new Intl.ListFormat('en-GB', { style: 'long', type: 'conjunction' }).format(list);

onMounted(async () => {
  await getBookById(route.params.id);
});
</script>
<template>
  <div class="container m-auto lg:p-10">
    <NCard :title="get(detail, 'title')">
      <div class="flex flex-col gap-4">
        <div class="font-semibold text-base">{{ formatter(get(detail, 'authors')) }} (author)</div>
        <div>
          <NImage :src="get(detail?.imageLinks, 'thumbnail')" />
        </div>
        <div v-html="get(detail, 'description')" />
      </div>
    </NCard>
  </div>
</template>

<style scoped></style>
