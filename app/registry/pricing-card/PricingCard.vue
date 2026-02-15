<script setup lang="ts">
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
</script>

<template>
  <div
    class="group relative rounded-lg border border-border bg-card px-6 py-4 min-w-78 max-w-95 aspect-9/13 flex flex-col shadow hover:shadow-md shadow-accent transition"

    :class="[isMostPopular ? 'border-2 border-primary shadow-3xl bg-linear-to-b from-primary/10 to-primary/5' : 'border']"
  >
    <span v-if="isMostPopular" class="absolute -top-3 -right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
      Most Popular
    </span>
    <h3 class="items-center font-bold text-4xl mb-2 flex justify-between text-card-foreground">
      {{ planName }}
    </h3>
    <div class="flex mt-2 items-end">
      <h4 class="text-2xl font-medium">
        {{ coin }}{{ price.toFixed(2) }}/
      </h4>
      <span class="text-base">{{ paymentMethod }}</span>
    </div>
    <div class="border-t border-border py-2">
      <slot v-if="$slots.default" />
      <div v-else>
        <ul class="mt-2 space-y-2">
          <li v-for="(pro, index) in pros" :key="index" class="flex items-center gap-2">
            <span class="text-check-span-pro">✔</span>
            <span>{{ pro }}</span>
          </li>
        </ul>
        <ul class="mt-2 space-y-2">
          <li v-for="(con, index) in cons" :key="index" class="flex items-center gap-2">
            <span class="text-check-span-con">✘</span>
            <span>{{ con }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="mb-2 mt-auto">
      <Button
        class="w-full primary bg-primary text-primary-foreground py-2 px-4 rounded-lg font-semibold"
      >
        Choose Plan
      </Button>
    </div>
  </div>
</template>
