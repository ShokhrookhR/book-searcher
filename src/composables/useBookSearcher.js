import { ref } from 'vue';
import axios from '@/plugins/axios.js';
import { useDebounceFn } from '@vueuse/core';

export const useBookSearcher = () => {
  const onSearch = useDebounceFn(getBooksByParams, 1000);
  const isLoading = ref(false);
  const results = ref([]);
  function getBooksByParams(value) {
    if (!value) {
      results.value = [];
      return;
    }
    results.value = [];
    isLoading.value = true;

    return axios
      .get(`/books/v1/volumes?q=${value}`)
      .then((res) => {
        results.value = res?.data?.items || [];
        isLoading.value = false;
      })
      .catch((err) => console.error(err))
      .finally(() => {
        isLoading.value = false;
      });
  }

  return {
    isLoading,
    results,
    onSearch
  };
};
