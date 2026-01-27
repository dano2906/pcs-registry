<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

interface Props {
  items: any[]
  repeats?: number
  speed?: number
  direction?: 'normal' | 'reverse'
  hoverColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  repeats: 2,
  speed: 30,
  direction: 'normal',
  hoverColor: 'accent',
})

const isHovered = ref(false)
const animationName = `scroll-${Math.random().toString(36).substr(2, 9)}`

// Inyectar keyframes dinámicamente
onMounted(() => {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = `
    @keyframes ${animationName} {
      0% { transform: translateX(0); }
      100% { transform: translateX(-100%); }
    }
  `
  document.head.appendChild(styleSheet)
})

// Computed classes
const containerClasses = computed(() => [
  'flex',
  'gap-4',
])

const carouselClasses = computed(() => [
  'flex',
  'shrink-0',
  'gap-4',
])

const itemClasses = computed(() => [
  'group',
  'relative',
  'min-w-[300px]',
  'rounded-lg',
  'border',
  'border-border',
  'bg-card',
  'p-6',
  'transition-all',
  'duration-300',
  `hover:border-accent`,
  'hover:shadow-lg',
  `hover:shadow-accent/20`,
])

const animationStyle = computed(() => {
  const animationDirection = props.direction === 'reverse' ? 'reverse' : 'normal'

  return {
    animation: isHovered.value
      ? 'none'
      : `${animationName} ${props.speed}s linear infinite ${animationDirection}`,
  }
})
</script>

<template>
  <div class="relative overflow-hidden">
    <!-- Left mask -->
    <div
      class="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-32 bg-gradient-to-r from-background to-transparent"
    />

    <!-- Right mask -->
    <div
      class="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-32 bg-gradient-to-l from-background to-transparent"
    />

    <!-- Carousel container -->
    <div
      :class="containerClasses"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <!-- Repeat items according to the multiplier -->
      <div
        v-for="set in repeats"
        :key="`set-${set}`"
        :class="carouselClasses"
        :style="animationStyle"
      >
        <div
          v-for="(item, index) in items"
          :key="`${set}-${index}`"
          :class="itemClasses"
        >
          <!-- If there is a custom slot, uses it -->
          <slot v-if="$slots.default" class="border-accent" :item="item" :index="index" />
          <!-- If there is no slot, renders the default content -->
          <div v-else>
            <p class="text-sm">
              {{ item.text || item.name || item.title || JSON.stringify(item) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
