<script setup lang="ts">
import { onMounted } from 'vue';
import { NCard, NImage, NSpin } from 'naive-ui';
import { useBookSearcher } from '@/composables/useBookSearcher.ts';
import get from 'lodash.get';
import { ArrowBackOutline } from '@vicons/ionicons5';

const { detail, getBookById, isLoading, route, router } = useBookSearcher();
const formatter = (list: string[]) =>
  new Intl.ListFormat('en-GB', { style: 'long', type: 'conjunction' }).format(list);

onMounted(async () => {
  await getBookById(route.params.id);
});
</script>
<template>
  <div class="lg:p-10 p-6 h-screen flex flex-col gap-3">
    <div class="container mx-auto flex items-center gap-5">
      <div class="w-7 cursor-pointer">
        <ArrowBackOutline size="20" @click="() => router.back()" />
      </div>
      <div class="font-bold text-2xl text-center">Detail page</div>
    </div>
    <template v-if="isLoading">
      <div class="flex justify-center items-center min-h-screen">
        <NSpin size="large" />
      </div>
    </template>
    <template v-else>
      <div class="container mx-auto">
        <NCard :title="get(detail, 'title')">
          <div class="flex flex-col gap-4">
            <div class="flex gap-5">
              <div>
                <NImage :src="get(detail?.imageLinks, 'thumbnail')" width="200" />
              </div>
              <div class="font-semibold text-base">
                Authors: {{ formatter(get(detail, 'authors')) }}
              </div>
            </div>
            <div v-html="get(detail, 'description')" />
          </div>
        </NCard>
      </div>
    </template>
  </div>
</template>

<style scoped></style>
