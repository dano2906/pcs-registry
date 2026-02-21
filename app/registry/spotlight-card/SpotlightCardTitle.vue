<script setup lang="ts">
import { cn } from '@/lib/utils'
import CardTitle from '~/components/ui/card/CardTitle.vue'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <CardTitle :class="cn(props.class)">
    <slot />
  </CardTitle>
</template>
