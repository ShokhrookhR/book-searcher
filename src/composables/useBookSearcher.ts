import { ref } from 'vue';
import axios from '@/plugins/axios.js';
import { useDebounceFn } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import { IData } from '@/types/index.ts';

export const useBookSearcher = () => {
  const route = useRoute();
  const router = useRouter();
  const isLoading = ref(false);
  const results = ref([]);
  const detail = ref<IData>();
  const onSearch = useDebounceFn(getBooksBySearch, 1000);

  function getBooksBySearch(value) {
    if (!value) {
      results.value = [];
      return;
    }
    router.push({
      query: {
        value: value
      }
    });

    results.value = [];
    isLoading.value = true;

    return axios
      .get(`/books/v1/volumes?q=${value || route.query.value}`)
      .then((res) => {
        results.value = res?.data?.items || [];
        isLoading.value = false;
      })
      .catch((err) => console.error(err))
      .finally(() => {
        isLoading.value = false;
      });
  }
  function getBookById(id) {
    isLoading.value = true;
    return axios
      .get(`/books/v1/volumes/${id || route.params.id}`)
      .then((res) => {
        detail.value = res?.data?.volumeInfo || {};
        isLoading.value = false;
      })
      .catch((err) => console.error(err))
      .finally(() => {
        isLoading.value = false;
      });
  }

  return {
    route,
    router,
    isLoading,
    results,
    detail,
    onSearch,
    getBooksBySearch,
    getBookById
  };
};
