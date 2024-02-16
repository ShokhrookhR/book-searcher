<script setup lang="ts">
import { NImage, NInput, NSpin, NTable } from 'naive-ui';
import { ref } from 'vue';
import { useBookSearcher } from '@/composables/useBookSearcher.js';

const { isLoading, results, onSearch } = useBookSearcher();
const searchValue = ref('');
const formatter = (list: string[]) =>
  new Intl.ListFormat('en-GB', { style: 'long', type: 'conjunction' }).format(list);
</script>
<template>
  <div class="py-10">
    <div class="container mx-auto flex flex-col gap-8">
      <div>
        <NInput :model-value="searchValue" :loading="isLoading" @input="onSearch" />
      </div>
      <template v-if="isLoading">
        <div class="flex justify-center items-center min-h-screen">
          <NSpin size="large" />
        </div>
      </template>
      <template v-else>
        <template v-if="!results.length">
          <div class="w-full">
            <div class="font-semibold text-2xl">List is empty</div>
          </div>
        </template>
        <template v-else>
          <div class="w-full">
            <NTable striped>
              <thead>
                <tr>
                  <th>Thumbnail</th>
                  <th>Title</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in results" :key="item.id" class="cursor-pointer">
                  <td class="hover:underline">
                    <NImage
                      :src="item?.volumeInfo?.imageLinks?.smallThumbnail"
                      height="100"
                      width="100"
                    />
                  </td>
                  <td class="hover:underline">{{ item?.volumeInfo?.title }}</td>
                  <td class="hover:underline">
                    {{ formatter(item?.volumeInfo?.authors) }}
                  </td>
                </tr>
              </tbody>
            </NTable>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
