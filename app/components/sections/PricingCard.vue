<script setup lang="ts">

</script>

<template>
  <PartialsSection
    id="#pricing-card"
    component-name="pricing-card"
    description="Componente de tarjetas de precios para SaaS"
    title="Pricing Cards"
  >
    <template #example>
      <div class="flex gap-4 flex-wrap justify-center">
        <PricingCard
          plan-name="Premium Plan"
          :price="99.99"
          coin="$"
          payment-method="month"
          is-most-popular="true"
        />
        <PricingCard
          plan-name="Advanced Plan"
          :price="49.99"
          coin="€"
          payment-method="year"
        />
        <PricingCard
          plan-name="Basic Plan"
          :price="19.99"
          coin="£"
          payment-method="week"
        />
        <PricingCard
          plan-name="Free Plan"
          :price="0.00"
          coin="$"
          :cons="['Ads every 10 minutes', 'Ads every 10 minutes', 'Ads every 10 minutes', 'Ads every 10 minutes']"
          :pros="['Unlimited access to basic features', 'Ads every 10 minutes', 'Ads every 10 minutes', 'Ads every 10 minutes', 'Ads every 10 minutes']"
        />
      </div>
    </template>
  </PartialsSection>
</template>
