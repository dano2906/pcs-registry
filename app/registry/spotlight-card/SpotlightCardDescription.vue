<script setup lang="ts">
import { cn } from '@/lib/utils'
import CardDescription from '~/components/ui/card/CardDescription.vue'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <CardDescription :class="cn(props.class)">
    <slot />
  </CardDescription>
</template>
