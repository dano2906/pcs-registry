<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  items: any[]
  repeats?: number
  speed?: number
  direction?: 'normal' | 'reverse'
}

const props = withDefaults(defineProps<Props>(), {
  repeats: 2,
  speed: 30,
  direction: 'normal',
})

const hoveredItem = ref<string | null>(null)

// Computed classes
const containerClasses = computed(() => [
  'flex',
  'gap-4',
])

const carouselClasses = computed(() => [
  'flex',
  'shrink-0',
  'gap-4',
  'animate-marquee',
  props.direction === 'reverse' ? 'direction-reverse' : '',
  hoveredItem.value !== null ? 'paused' : '',
])

// ...existing code...
function getItemClasses(set: number, index: number) {
  const itemKey = `${set}-${index}`
  const isHovered = hoveredItem.value === itemKey

  return {
    'group': true,
    'relative': true,
    'min-w-[300px]': true,
    'rounded-lg': true,
    'border': true,
    'border-border': true,
    'bg-card': true,
    'p-6': true,
    'transition-all': true,
    'duration-300': true,
    'outline': isHovered,
    'outline-2': isHovered,
    'outline-offset-2': isHovered,
    'outline-accent': isHovered,
    'animate-pulse': isHovered,
  }
}
</script>

<template>
  <div class="relative overflow-hidden py-1">
    <!-- Left mask -->
    <div
      class="pointer-events-none absolute bottom-1 left-0 top-1 z-10 w-32 bg-gradient-to-r from-background to-transparent"
    />

    <!-- Right mask -->
    <div
      class="pointer-events-none absolute bottom-1 right-0 top-1 z-10 w-32 bg-gradient-to-l from-background to-transparent"
    />

    <!-- Carousel container -->
    <div
      :class="containerClasses"
    >
      <!-- Repeat items according to the multiplier -->
      <div
        v-for="set in repeats"
        :key="`set-${set}`"
        :class="carouselClasses"
        :style="{ animationDuration: `${props.speed}s` }"
      >
        <div
          v-for="(item, index) in items"
          :key="`${set}-${index}`"
          :class="getItemClasses(set, index)"
          @mouseenter="hoveredItem = `${set}-${index}`"
          @mouseleave="hoveredItem = null"
        >
          <!-- If there is a custom slot, uses it -->
          <slot v-if="$slots.default" :item="item" :index="index" />
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

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}

.direction-reverse {
  animation-direction: reverse;
}

.paused {
  animation-play-state: paused;
}
</style>
