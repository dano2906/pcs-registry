<script lang="ts" setup>
import {
  SpotlightCard,
  SpotlightCardBeam,
  SpotlightCardContent,
  SpotlightCardDescription,
  SpotlightCardGradient,
  SpotlightCardHeader,
  SpotlightCardMultiple,
  SpotlightCardTilt,
  SpotlightCardTitle,
} from '~/registry/spotlight-card/index'
</script>

<template>
  <PartialsSection id="spotlight-card" component-name="spotlight-card" description="Componente de tarjeta con brillo." title="Spotlight card" :registry-dependencies="[]">
    <template #example>
      <div class="w-full grid grid-cols-4 gap-2">
        <SpotlightCard :border-radius="20" spotlight-color="rgba(56, 189, 248, 0.2)">
          <SpotlightCardHeader>
            <SpotlightCardTitle>Advanced Analytics</SpotlightCardTitle>
            <SpotlightCardDescription>
              Track your data in real-time with high precision.
            </SpotlightCardDescription>
          </SpotlightCardHeader>
          <SpotlightCardContent>
            <div class="h-32 rounded-lg bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
          </SpotlightCardContent>
        </SpotlightCard>
        <SpotlightCardBeam :border-radius="20" spotlight-color="rgba(56, 189, 248, 0.2)">
          <SpotlightCardHeader>
            <SpotlightCardTitle>Advanced Analytics</SpotlightCardTitle>
            <SpotlightCardDescription>
              Track your data in real-time with high precision.
            </SpotlightCardDescription>
          </SpotlightCardHeader>
          <SpotlightCardContent>
            <div class="h-32 rounded-lg bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
          </SpotlightCardContent>
        </SpotlightCardBeam>
        <SpotlightCardGradient :border-radius="20" spotlight-color="rgba(56, 189, 248, 0.2)">
          <SpotlightCardHeader>
            <SpotlightCardTitle>Advanced Analytics</SpotlightCardTitle>
            <SpotlightCardDescription>
              Track your data in real-time with high precision.
            </SpotlightCardDescription>
          </SpotlightCardHeader>
          <SpotlightCardContent>
            <div class="h-32 rounded-lg bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
          </SpotlightCardContent>
        </SpotlightCardGradient>
        <SpotlightCardTilt
          :max-tilt="15"
          :scale="1.05"
        >
          <SpotlightCardContent class="text-center">
            <h2 class="text-2xl font-bold italic">
              PRO PLAN
            </h2>
            <p class="text-neutral-500">
              $29/mo
            </p>
          </SpotlightCardContent>
        </SpotlightCardTilt>
        <SpotlightCardMultiple
          :max-tilt="15"
          :scale="1.05"
        >
          <SpotlightCardContent class="text-center">
            <h2 class="text-2xl font-bold italic">
              PRO PLAN
            </h2>
            <p class="text-neutral-500">
              $29/mo
            </p>
          </SpotlightCardContent>
        </SpotlightCardMultiple>
      </div>
    </template>
  </PartialsSection>
</template>
