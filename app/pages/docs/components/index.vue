<script setup lang="ts">
import { components } from '@/lib/constants'

definePageMeta({
  name: 'component-list-page',
})
</script>

<template>
  <div class="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-8 my-4">
    <NuxtLink
      v-for="component in components"
      :key="component.href"
      :to="component.href"
      class="relative inline-block text-foreground hover:text-primary transition-colors duration-300 group py-1"
    >
      {{ component.label }}
      <span class="absolute left-0 bottom-0 w-0 bg-primary h-[2px] transition-all duration-300 group-hover:w-full" />
    </NuxtLink>
  </div>
  <div class="w-full flex items-center justify-end my-8">
    <NuxtLink to="/docs/overview" class="text-primary underline decoration-primary font-medium py-2 px-4">
      {{ $t('overview.title') }}
    </NuxtLink>
    <NuxtLink to="/docs/contributing" class="text-primary underline decoration-primary font-medium py-2 px-4">
      {{ $t('contributing.title') }}
    </NuxtLink>
  </div>
</template>
