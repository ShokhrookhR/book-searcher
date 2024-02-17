<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { NInput, NSpace, NSpin, NButton, NCard } from 'naive-ui';
import { RouterNames } from '@/constants/index.ts';

const router = useRouter();
const userName = ref('');
const isLoading = ref(false);
// const showError = ref(false);
function onSubmit() {
  isLoading.value = true;
  const regexp = /^[a-zA-Z]{16}$/g.test(userName.value);
  setTimeout(() => {
    isLoading.value = false;
    if (regexp) {
      router.push({ name: RouterNames.Home });
      return;
    }
    alert('Invalid username');
  }, 3000);
}
</script>
<template>
  <div class="w-[400px] mx-auto my-[150px] h-[500px]">
    <NSpace vertical>
      <NSpin :show="isLoading">
        <div class="w-full">
          <NCard>
            <div class="flex flex-col gap-3">
              <div class="d-flex justify-center mb-[43px]">
                <!-- <span class="me-2 w-[6px] bg-secondary" /> -->
                <h2 class="text-center uppercase text-[32px] font-[700]">Book Searcher</h2>
              </div>
              <div class="text-center mb-[50px]">
                <h3 class="text-[28px] font-[600] uppercase">Sign in</h3>
                <p class="text-[14px]">Enter your credentials to enter</p>
              </div>
              <div>
                <NInput
                  v-model:value="userName"
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <NButton @click="onSubmit">Submit</NButton>
            </div>
          </NCard>
        </div>
        <template #description></template>
      </NSpin>
    </NSpace>
  </div>
</template>
