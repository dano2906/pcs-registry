<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Card } from '~/components/ui/card'

interface GradientFollowCardProps {
  gradientColors?: [string, string, string]
  borderRadius?: number
  class?: string
}

const props = withDefaults(defineProps<GradientFollowCardProps>(), {
  gradientColors: () => ['#7877c6', '#5eead4', '#f472b6'],
  borderRadius: 16,
})

const containerRef = ref<HTMLDivElement | null>(null)
const position = ref({ x: 50, y: 50 })
const isHovered = ref(false)

function handleMouseMove(e: MouseEvent) {
  if (!containerRef.value)
    return
  const rect = containerRef.value.getBoundingClientRect()
  position.value = {
    x: ((e.clientX - rect.left) / rect.width) * 100,
    y: ((e.clientY - rect.top) / rect.height) * 100,
  }
}
</script>

<template>
  <Card
    ref="containerRef"
    :class="cn(props.class)"
    :style="{ borderRadius: `${props.borderRadius}px` }"
    @mousemove="handleMouseMove"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div
      class="absolute inset-0 transition-opacity duration-500"
      :style="{
        background: `
          radial-gradient(600px circle at ${position.x}% ${position.y}%, ${props.gradientColors[0]}40, transparent 40%),
          radial-gradient(400px circle at ${position.x + 10}% ${position.y - 10}%, ${props.gradientColors[1]}30, transparent 40%),
          radial-gradient(300px circle at ${position.x - 10}% ${position.y + 10}%, ${props.gradientColors[2]}20, transparent 40%)
        `,
        opacity: isHovered ? 1 : 0.3,
      }"
    />

    <div
      class="absolute inset-0 bg-white/90 dark:bg-neutral-950/90"
      :style="{ borderRadius: `${props.borderRadius}px` }"
    />

    <div
      class="absolute inset-0 pointer-events-none transition-opacity duration-500"
      :style="{
        borderRadius: `${props.borderRadius}px`,
        border: '1px solid',
        borderColor: isHovered ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
      }"
    />

    <div class="relative z-10">
      <slot />
    </div>
  </Card>
</template>
