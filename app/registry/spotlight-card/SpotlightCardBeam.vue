<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Card } from '~/components/ui/card'

interface BeamSpotlightCardProps {
  beamColor?: string
  beamWidth?: number
  borderRadius?: number
  class?: string
}

const props = withDefaults(defineProps<BeamSpotlightCardProps>(), {
  beamColor: 'rgba(120, 119, 198, 0.5)',
  beamWidth: 200,
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
  <Card
    ref="containerRef"
    :class="
      cn(
        props.class,
      )
    "
    :style="{
      'borderRadius': `${props.borderRadius}px`,
      '--mouse-x': `${position.x}px`,
      '--mouse-y': `${position.y}px`,
      '--beam-color': props.beamColor,
      '--beam-width': `${props.beamWidth}px`,
    }"
    @mousemove="handleMouseMove"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div
      class="absolute pointer-events-none transition-all duration-150"
      :style="{
        left: `calc(var(--mouse-x) - (var(--beam-width) / 2))`,
        top: 0,
        width: 'var(--beam-width)',
        height: '100%',
        background: `linear-gradient(90deg, transparent, var(--beam-color), transparent)`,
        opacity: isHovered ? 0.6 : 0,
        filter: 'blur(20px)',
      }"
    />

    <div
      class="absolute pointer-events-none transition-all duration-150"
      :style="{
        left: 0,
        top: `calc(var(--mouse-y) - (var(--beam-width) / 2))`,
        width: '100%',
        height: 'var(--beam-width)',
        background: `linear-gradient(180deg, transparent, var(--beam-color), transparent)`,
        opacity: isHovered ? 0.4 : 0,
        filter: 'blur(20px)',
      }"
    />

    <div
      class="absolute pointer-events-none transition-all duration-150"
      :style="{
        left: 'var(--mouse-x)',
        top: 'var(--mouse-y)',
        width: '100px',
        height: '100px',
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, var(--beam-color) 0%, transparent 70%)`,
        opacity: isHovered ? 1 : 0,
      }"
    />

    <div class="relative z-10">
      <slot />
    </div>
  </Card>
</template>
