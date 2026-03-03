<script setup lang="ts">
import CurrencySelector from '@/registry/currency-selector/CurrencySelector.vue'

const currency1 = ref('USD')
const currency2 = ref('EUR')
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 bg-muted/20 rounded-lg border">
    <div class="space-y-2">
      <label class="text-sm font-medium">Default (Spanish)</label>
      <CurrencySelector v-model="currency1" />
    </div>

    <div class="space-y-2">
      <label class="text-sm font-medium">English Config</label>
      <CurrencySelector
        v-model="currency2"
        lang="en-US"
        :config="{
          placeholder: 'Select currency',
          searchPlaceholder: 'Search...',
          emptyState: 'No currencies found',
        }"
      />
    </div>

    <div class="col-span-full pt-4 border-t text-sm text-muted-foreground">
      Selected: <span class="font-bold text-foreground">{{ currency1 }}</span> / <span class="font-bold text-foreground">{{ currency2 }}</span>
    </div>
  </div>
</template>
