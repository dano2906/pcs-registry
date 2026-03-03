<script setup lang="ts">
import MultiSelect from '@/registry/multi-select/MultiSelect.vue'

const selectedFruits = ref(['apple', 'banana'])
const fruitOptions = [
  {
    heading: 'Citrus',
    items: [
      { text: 'Orange', value: 'orange' },
      { text: 'Lemon', value: 'lemon' },
      { text: 'Lime', value: 'lime' },
    ],
  },
  {
    heading: 'Berries',
    items: [
      { text: 'Strawberry', value: 'strawberry' },
      { text: 'Blueberry', value: 'blueberry' },
      { text: 'Raspberry', value: 'raspberry' },
    ],
  },
  {
    heading: 'Tropical',
    items: [
      { text: 'Apple', value: 'apple' },
      { text: 'Banana', value: 'banana' },
      { text: 'Mango', value: 'mango' },
      { text: 'Pineapple', value: 'pineapple' },
    ],
  },
]
</script>

<template>
  <div class="flex flex-col items-center justify-center p-12 bg-muted/20 rounded-lg border gap-8 max-w-2xl mx-auto overflow-hidden">
    <div class="w-full space-y-4">
      <h4 class="text-xs font-bold uppercase text-muted-foreground mb-4 tracking-widest text-center">
        Grouped Multi Selection
      </h4>

      <div class="w-full border rounded-xl bg-background shadow-lg p-6 space-y-4">
        <label class="text-sm font-medium text-foreground block mb-2">Select your favorite fruits</label>
        <MultiSelect
          v-model="selectedFruits"
          :data="fruitOptions"
          :config="{
            emptyMessage: 'Select fruits from the list',
            emptySearchMessage: 'No fruit matches your search',
            searchPlaceholder: 'Search fruit...',
          }"
        />

        <div class="pt-6 border-t mt-4 flex flex-wrap gap-2 items-center min-h-12">
          <span class="text-xs font-bold text-muted-foreground uppercase tracking-widest block w-full mb-1">Selected Values:</span>
          <span
            v-for="val in selectedFruits"
            :key="val"
            class="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20"
          >
            {{ val }}
          </span>
          <span v-if="selectedFruits.length === 0" class="text-sm text-muted-foreground italic tracking-tight">No fruits selected yet.</span>
        </div>
      </div>
    </div>
  </div>
</template>
