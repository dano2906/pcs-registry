<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'

interface MultiSpotlightCardProps {
  colors?: string[]
  borderRadius?: number
  class?: string
}

const props = withDefaults(defineProps<MultiSpotlightCardProps>(), {
  colors: () => [
    'rgba(120, 119, 198, 0.4)',
    'rgba(255, 77, 77, 0.3)',
    'rgba(77, 255, 174, 0.3)',
  ],
  borderRadius: 16,
})

const containerRef = ref<HTMLDivElement | null>(null)
const position = ref({ x: 0, y: 0 })
const isHovered = ref(false)

function handleMouseMove(e: MouseEvent) {
  if (!containerRef.value)
    return
  const rect = containerRef.value.getBoundingClientRect()
  position.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }
}
</script>

<template>
  <div
    ref="containerRef"
    :class="
      cn(
        'relative overflow-hidden bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 transition-all duration-500',
        props.class,
      )
    "
    :style="{
      'borderRadius': `${props.borderRadius}px`,
      '--mouse-x': `${position.x}px`,
      '--mouse-y': `${position.y}px`,
    }"
    @mousemove="handleMouseMove"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div
      v-for="(color, index) in props.colors"
      :key="index"
      class="absolute pointer-events-none transition-opacity duration-500"
      :style="{
        left: `calc(var(--mouse-x) + ${(index - 1) * 50}px)`,
        top: `calc(var(--mouse-y) + ${(index - 1) * 50}px)`,
        width: '300px',
        height: '300px',
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: isHovered ? 1 : 0,
        filter: 'blur(40px)',
      }"
    />

    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>
