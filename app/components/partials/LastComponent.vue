<script setup lang="ts">
import { ArrowRightIcon } from 'lucide-vue-next'
import { site_config } from '@/lib/constants'
</script>

<template>
  <Badge variant="outline" class="border-accent text-primary text-sm hover:bg-primary/10 transition z-20">
    <NuxtLink :to="site_config.last_component_url" class="w-auto text-primary z-20 flex items-center gap-2">
      <div class="size-2 bg-primary animate-pulse rounded-full" />
      {{ $t('last_component') }}
      <ArrowRightIcon class="size-4" />
    </NuxtLink>
  </Badge>
</template>
