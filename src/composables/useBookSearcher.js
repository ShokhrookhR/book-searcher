import { ref } from 'vue';
import axios from '@/plugins/axios.js';
import { useDebounceFn } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
export const useBookSearcher = () => {
  const route = useRoute();
  const router = useRouter();
  const onSearch = useDebounceFn(getBooksByParams, 1000);
  const isLoading = ref(false);
  const results = ref([]);
  const detail = ref([]);
  function getBooksByParams(value) {
    if (!value) {
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
  function getBookById(id) {
    isLoading.value = true;
    return axios
      .get(`/books/v1/volumes/${id || route.params.id}`)
      .then((res) => {
        detail.value = res?.data?.volumeInfo || {};
        isLoading.value = false;
      })
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
    getBookById
  };
};
