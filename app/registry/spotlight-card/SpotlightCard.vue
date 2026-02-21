<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Card } from '~/components/ui/card'

interface SpotlightCardProps {
  spotlightColor?: string
  borderColor?: string
  borderWidth?: number
  borderRadius?: number
  glowIntensity?: number
  class?: string
}

const props = withDefaults(defineProps<SpotlightCardProps>(), {
  spotlightColor: 'rgba(120, 119, 198, 0.3)',
  borderWidth: 1,
  borderRadius: 16,
  glowIntensity: 0.15,
})

const containerRef = ref<HTMLDivElement | null>(null)
const position = ref({ x: 0, y: 0 })
const isHovered = ref(false)
const opacity = ref(0)

function handleMouseMove(e: MouseEvent) {
  if (!containerRef.value)
    return
  const rect = containerRef.value.getBoundingClientRect()
  position.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }
}

function handleMouseEnter() {
  isHovered.value = true
  opacity.value = 1
}

function handleMouseLeave() {
  isHovered.value = false
  opacity.value = 0
}
</script>

<template>
  <Card
    ref="containerRef"
    :class="
      cn(
        props.class,
      )
    "
    :style="{
      '--border-radius': `${props.borderRadius}px`,
      '--spotlight-color': props.spotlightColor,
      '--mouse-x': `${position.x}px`,
      '--mouse-y': `${position.y}px`,
      '--glow-opacity': opacity * props.glowIntensity * 5,
      '--border-color': props.borderColor || `conic-gradient(from 225deg, rgba(120, 119, 198, 0.9), rgba(120, 119, 198, 0.1) 25%, rgba(255, 255, 255, 0.15) 50%, rgba(120, 119, 198, 0.1) 75%, rgba(120, 119, 198, 0.9))`,
    }"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="absolute inset-0 pointer-events-none transition-opacity duration-500"
      :style="{
        borderRadius: 'var(--border-radius)',
        padding: `${props.borderWidth}px`,
        background: 'var(--border-color)',
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'exclude',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        opacity: isHovered ? 1 : 0.5,
      }"
    />

    <div
      class="absolute pointer-events-none transition-opacity duration-300"
      :style="{
        left: 'var(--mouse-x)',
        top: 'var(--mouse-y)',
        width: '400px',
        height: '400px',
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, var(--spotlight-color) 0%, transparent 70%)`,
        opacity: 'var(--glow-opacity)',
      }"
    />

    <div
      class="absolute inset-0 pointer-events-none transition-opacity duration-500"
      :style="{
        borderRadius: 'var(--border-radius)',
        opacity: isHovered ? 0.5 : 0,
        boxShadow: `inset 0 0 30px rgba(120, 119, 198, 0.1), 0 0 30px rgba(120, 119, 198, 0.1)`,
      }"
    />

    <div class="relative z-10">
      <slot />
    </div>
  </Card>
</template>
