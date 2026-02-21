<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Card } from '~/components/ui/card'

interface TiltSpotlightCardProps {
  maxTilt?: number
  perspective?: number
  scale?: number
  borderRadius?: number
  glareOpacity?: number
  spotlightColor?: string
  class?: string
}

const props = withDefaults(defineProps<TiltSpotlightCardProps>(), {
  maxTilt: 10,
  perspective: 1000,
  scale: 1.02,
  borderRadius: 16,
  glareOpacity: 0.2,
  spotlightColor: 'rgba(120, 119, 198, 0.3)',
})

const containerRef = ref<HTMLDivElement | null>(null)
const transform = ref({ rotateX: 0, rotateY: 0, scale: 1 })
const glarePosition = ref({ x: 50, y: 50 })
const spotlightPosition = ref({ x: 0, y: 0 })
const isHovered = ref(false)

function handleMouseMove(e: MouseEvent) {
  if (!containerRef.value)
    return
  const rect = containerRef.value.getBoundingClientRect()
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const mouseX = e.clientX - rect.left
  const mouseY = e.clientY - rect.top

  transform.value = {
    rotateY: ((mouseX - centerX) / centerX) * props.maxTilt,
    rotateX: -((mouseY - centerY) / centerY) * props.maxTilt,
    scale: props.scale,
  }
  glarePosition.value = {
    x: (mouseX / rect.width) * 100,
    y: (mouseY / rect.height) * 100,
  }
  spotlightPosition.value = { x: mouseX, y: mouseY }
}

function handleMouseLeave() {
  transform.value = { rotateX: 0, rotateY: 0, scale: 1 }
  isHovered.value = false
}
</script>

<template>
  <Card
    ref="containerRef"
    :class="
      cn(
        isHovered && 'border-neutral-300 dark:border-neutral-700',
        props.class,
      )
    "
    :style="{
      borderRadius: `${props.borderRadius}px`,
      perspective: `${props.perspective}px`,
      transform: `perspective(${props.perspective}px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
      transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
    }"
    @mousemove="handleMouseMove"
    @mouseenter="isHovered = true"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="absolute inset-0 pointer-events-none transition-opacity duration-300"
      :style="{
        background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, ${props.glareOpacity}) 0%, transparent 50%)`,
        opacity: isHovered ? 1 : 0,
      }"
    />

    <div
      class="absolute pointer-events-none transition-opacity duration-300"
      :style="{
        left: `${spotlightPosition.x}px`,
        top: `${spotlightPosition.y}px`,
        width: '400px',
        height: '400px',
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, ${props.spotlightColor} 0%, transparent 70%)`,
        opacity: isHovered ? 0.4 : 0,
        filter: 'blur(20px)',
      }"
    />

    <div class="relative z-10">
      <slot />
    </div>
  </Card>
</template>
