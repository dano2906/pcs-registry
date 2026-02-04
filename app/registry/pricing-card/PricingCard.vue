<script setup lang="ts">
// import { ref } from 'vue';

interface Props {
  planName: string
  price: number
  coin?: '$' | '€' | '£' | '¥'
  pros?: string[]
  cons?: string[]
  isMostPopular?: boolean
  paymentMethod?: 'month' | 'year' | 'week'
}

const { pros = ['Unlimited checks', 'Unlimited devices'], cons = ['Limited month access', 'Limited search area'], paymentMethod = 'month', coin = '$', isMostPopular = false } = defineProps<Props>()

const cardStyles = computed(() => {
  return isMostPopular ? 'border-primary shadow-3xl ring-4 ring-ring bg-gradient-to-b' : ''
})
</script>

<template>
  <div
    class="group relative rounded-lg border border-border shadow-md bg-card p-6  min-w-78 max-w-95 min-h-112.5 max-h-[470] hover:scale-[1.02] transition-transform flex flex-col"
    :class="cardStyles"
  >
    <!-- Badge "Most Popular" -->
    <div v-if="isMostPopular" class="absolute -top-3 -right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
      Most Popular
    </div>
    <div class="plan-type items-center font-bold text-4xl mb-2 flex justify-between">
      {{ planName }}
    </div>
    <div v-if="type !== 'free'" class="flex gap-1 mt-4 items-center">
      <h2>{{ coin }}{{ price.toFixed(2) }}</h2>
      <h3>/{{ paymentMethod }}</h3>
    </div>
    <div v-else class="flex gap-1 mt-4 items-center">
      <h2>{{ coin }}0.00</h2>
      <h3>/{{ paymentMethod }}</h3>
    </div>
    <div class="plan-description border-t border-border mt-4 pt-4">
      <!-- If there is a custom slot, uses it -->
      <slot v-if="$slots.default" />
      <!-- If there is no slot, renders the default content -->
      <div v-else>
        <ul class="mt-4 space-y-2">
          <li v-for="(pro, index) in pros" :key="index" class="flex items-center gap-2">
            <span class="check-span-pro">✔</span>
            <span>{{ pro }}</span>
          </li>
        </ul>
        <ul class="mt-4 space-y-2">
          <li v-for="(con, index) in cons" :key="index" class="flex items-center gap-2">
            <span class="check-span-con">✘</span>
            <span>{{ con }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-auto pb-2">
      <button
        class="w-full primary bg-primary text-primary-foreground py-2 px-4 rounded-lg font-semibold hover:scale-[1.02] transition-transform cursor-pointer"
      >
        Choose Plan
      </button>
    </div>
  </div>
</template>
