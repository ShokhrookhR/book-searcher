<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { NInput, NSpace, NSpin, NButton, NCard, NAlert } from 'naive-ui';
import { RouterNames } from '@/constants/index.ts';

const router = useRouter();
const userName = ref('');
const isLoading = ref(false);
const showError = ref(false);
function onSubmit() {
  showError.value = false;
  isLoading.value = true;
  const regexp = /^[a-zA-Z]{16}$/g.test(userName.value);
  setTimeout(() => {
    isLoading.value = false;
    if (!regexp) {
      showError.value = true;
      return;
    }
    sessionStorage.setItem('isAuthenticated', 'authenticated');
    router.push({ name: RouterNames.Home });
  }, 3000);
}
</script>
<template>
  <div class="sm:py-10 h-screen p-6">
    <div class="max-w-[500px] m-auto">
      <NSpace vertical>
        <NAlert v-if="showError" title="Validation Error" type="error">
          Username is not valid
        </NAlert>
        <NSpin :show="isLoading">
          <div class="h-full">
            <NCard title="Book Searcher" size="huge">
              <div class="flex flex-col gap-3">
                <div class="text-center mb-[50px]">
                  <h3 class="text-[28px] font-[600] uppercase">Sign in</h3>
                  <p class="text-base">Enter your username to enter</p>
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
  </div>
</template>
