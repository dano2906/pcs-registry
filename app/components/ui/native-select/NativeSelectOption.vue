<!-- @fallthroughAttributes true -->
<!-- @strictTemplates true -->

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <option data-slot="native-select-option" :class="cn('w-auto min-w-28 px-2 bg-popover text-popover-foreground', props.class)">
    <slot />
  </option>
</template>
