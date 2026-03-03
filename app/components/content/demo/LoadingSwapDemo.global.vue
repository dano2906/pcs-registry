<script setup lang="ts">
import { Button } from '@/components/ui/button'
import LoadingSwap from '@/registry/loading-swap/LoadingSwap.vue'

const isLoading = ref(false)

function toggleLoading() {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}
</script>

<template>
  <div class="flex flex-col items-center justify-center p-12 bg-muted/20 rounded-lg border gap-8 max-w-xl mx-auto">
    <div class="w-full space-y-4">
      <h4 class="text-sm font-semibold text-center mb-6 text-muted-foreground uppercase tracking-widest">
        Component with Loading State
      </h4>

      <div class="relative flex flex-col items-center justify-center gap-6 p-10 border rounded-xl bg-background shadow-xl">
        <LoadingSwap :is-loading="isLoading">
          <div class="flex flex-col items-center justify-center text-center gap-4">
            <div class="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-bold">
              ✓
            </div>
            <div class="space-y-1">
              <h5 class="text-xl font-bold">
                Success!
              </h5>
              <p class="text-sm text-muted-foreground">
                Your request has been processed successfully.
              </p>
            </div>
          </div>
        </LoadingSwap>

        <Button
          variant="secondary"
          :disabled="isLoading"
          class="w-full mt-4"
          @click="toggleLoading"
        >
          <LoadingSwap :is-loading="isLoading">
            {{ isLoading ? 'Processing...' : 'Toggle Loading (2s)' }}
          </LoadingSwap>
        </Button>
      </div>
    </div>
  </div>
</template>
