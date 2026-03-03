<script setup lang="ts">
import SliderRange from '@/registry/slider-range/SliderRange.vue'

const singleValue = ref(45)
const rangeValue = ref([25, 75])
const stepValue = ref([0, 50])
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-12 p-12 bg-muted/20 rounded-xl border max-w-6xl mx-auto overflow-hidden">
    <div class="space-y-4">
      <h4 class="text-xs font-bold uppercase text-muted-foreground mb-6 tracking-widest text-center">
        Standard Configuration
      </h4>
      <div class="p-8 border rounded-xl bg-background shadow-xl space-y-12">
        <div class="space-y-4">
          <label class="text-sm font-medium text-foreground block mb-2">Single Value</label>
          <SliderRange v-model="singleValue" :min="0" :max="100" />
          <div class="text-xs font-bold text-muted-foreground uppercase tracking-widest text-right">
            Value: <span class="text-primary text-base font-bold tracking-normal">{{ singleValue }}</span>
          </div>
        </div>

        <div class="space-y-4 border-t pt-8">
          <label class="text-sm font-medium text-foreground block mb-2">Range Selection</label>
          <SliderRange v-model="rangeValue" :min="0" :max="100" />
          <div class="text-xs font-bold text-muted-foreground uppercase tracking-widest text-right">
            Range: <span class="text-primary text-base font-bold tracking-normal">{{ rangeValue[0] }} - {{ rangeValue[1] }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h4 class="text-xs font-bold uppercase text-muted-foreground mb-6 tracking-widest text-center text-center">
        Step Ticks & Custom Step
      </h4>
      <div class="p-8 border rounded-xl bg-background shadow-xl space-y-12 h-full flex flex-col justify-center">
        <div class="space-y-4">
          <label class="text-sm font-medium text-foreground block mb-2">Step Ticks (Step: 10)</label>
          <SliderRange
            v-model="stepValue"
            :min="0"
            :max="100"
            :step="10"
            :step-ticks="true"
          />
          <p class="text-[10px] text-muted-foreground italic tracking-tight">
            Visual markers help users see available increments.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
