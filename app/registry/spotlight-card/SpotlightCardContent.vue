<script setup lang="ts">
import { cn } from '@/lib/utils'
import CardContent from '~/components/ui/card/CardContent.vue'

const props = defineProps<{ class?: string }>()
</script>

<template>
  <CardContent :class="cn(props.class)">
    <slot />
  </CardContent>
</template>
