<script setup lang="ts">
import PricingCard from '@/registry/pricing-card/PricingCard.vue'

const features = [
  'Unlimited projects',
  'Priority support',
  'Advanced analytics',
  'API access',
]

const freeFeatures = [
  'Up to 3 projects',
  'Community support',
]

const freeCons = [
  'Advanced analytics',
  'API access',
]
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 p-12 bg-muted/20 rounded-xl border max-w-6xl mx-auto overflow-hidden">
    <PricingCard
      plan-name="Free"
      :price="0"
      :pros="freeFeatures"
      :cons="freeCons"
      class="border-muted-foreground/10 hover:border-muted-foreground/30 transition-all hover:scale-[1.02] shadow-sm hover:shadow-xl"
    />

    <PricingCard
      plan-name="Pro"
      :price="29"
      :pros="features"
      :is-most-popular="true"
      class="border-primary/40 hover:border-primary shadow-2xl scale-[1.05] z-10 transition-all hover:scale-[1.07] shadow-primary/20"
    />

    <PricingCard
      plan-name="Enterprise"
      :price="99"
      :pros="[...features, 'Dedicated manager', 'SLA guarantees']"
      payment-method="month"
      class="border-muted-foreground/10 hover:border-muted-foreground/30 transition-all hover:scale-[1.02] shadow-sm hover:shadow-xl"
    />
  </div>
</template>
