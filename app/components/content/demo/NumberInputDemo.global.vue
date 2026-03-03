<script setup lang="ts">
import NumberInput from '@/registry/number-input/NumberInput.vue'

const age = ref(25)
const quantity = ref(1)
const stepValue = ref(0)
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-12 bg-muted/20 rounded-lg border max-w-4xl mx-auto overflow-hidden">
    <div class="space-y-4">
      <h4 class="text-xs font-bold uppercase text-muted-foreground mb-4 tracking-widest text-center">
        Standard Constraints
      </h4>
      <div class="space-y-2 p-6 border rounded-xl bg-background shadow-lg">
        <label class="text-sm font-medium text-foreground block mb-2">Age (18-99)</label>
        <NumberInput v-model="age" :min="18" :max="99" class="w-full" />
        <p class="text-[10px] text-muted-foreground italic">
          Try entering a value below 18 or above 99.
        </p>

        <div class="pt-4 border-t mt-4 flex justify-between items-center text-sm font-bold text-muted-foreground uppercase tracking-widest">
          Selected Age: <span class="text-primary text-xl font-bold">{{ age || '--' }}</span>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h4 class="text-xs font-bold uppercase text-muted-foreground mb-4 tracking-widest text-center text-center">
        Step & Condition
      </h4>
      <div class="space-y-2 p-6 border rounded-xl bg-background shadow-lg">
        <label class="text-sm font-medium text-foreground block mb-2">Quantity (Step: 5)</label>
        <NumberInput v-model="stepValue" :step="5" class="w-full" />

        <label class="text-sm font-medium text-foreground block mb-2 mt-4">Condition (Only Even Numbers)</label>
        <NumberInput
          v-model="quantity"
          :condition="(val: number) => val % 2 === 0"
          class="w-full border-primary/20 focus:border-primary transition-colors pb-1"
        />
        <p class="text-[10px] text-muted-foreground italic">
          Odd numbers will be cleared automatically.
        </p>
      </div>
    </div>
  </div>
</template>
