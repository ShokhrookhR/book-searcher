<script setup lang="ts">
import { NImage, NInput, NSpin, NTable } from 'naive-ui';
import { onMounted, ref } from 'vue';
import { useBookSearcher } from '@/composables/useBookSearcher.ts';
import { RouterNames } from '@/constants/index.ts';

const { isLoading, results, onSearch, getBooksBySearch, router, route } = useBookSearcher();
const searchValue = ref(route.query.value || '');
const formatter = (list: string[]) =>
  new Intl.ListFormat('en-GB', { style: 'long', type: 'conjunction' }).format(list);

function onClickItem(id: string | number) {
  router.push({ name: RouterNames.View, params: { id } });
}
onMounted(async () => {
  if (!route.query.value) {
    return;
  }
  await getBooksBySearch(route.query.value);
});
</script>
<template>
  <div class="lg:p-10 p-6">
    <div class="container mx-auto flex flex-col gap-8">
      <div class="max-w-[400px]">
        <NInput
          :model-value="searchValue"
          :loading="isLoading"
          placeholder="Search"
          @input="onSearch"
        />
      </div>
      <template v-if="isLoading">
        <div class="flex justify-center items-center min-h-screen">
          <NSpin size="large" />
        </div>
      </template>
      <template v-else>
        <template v-if="!results.length">
          <div class="w-full">
            <div class="font-base text-xl">List is empty</div>
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
                <tr
                  v-for="item in results"
                  :key="item.id"
                  class="cursor-pointer"
                  @click="onClickItem(item.id)"
                >
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
