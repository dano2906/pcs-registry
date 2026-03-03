<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  items: any[]
  repeats?: number
  speed?: number
  direction?: 'normal' | 'reverse'
  orientation?: 'horizontal' | 'vertical'
}

const { repeats = 2, speed = 30, direction = 'normal', orientation = 'horizontal' } = defineProps<Props>()

const hoveredItem = ref<string | null>(null)

const containerClasses = computed(() => [
  'flex',
  orientation === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-4',
])

const carouselClasses = computed(() => [
  'flex',
  'shrink-0',
  'gap-4',
  orientation === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-4',
  orientation === 'horizontal' ? 'animate-marquee' : 'animate-marquee-vertical',
  direction === 'reverse' ? 'direction-reverse' : '',
  hoveredItem.value !== null ? 'paused' : '',
])

function getItemClasses(set: number, index: number) {
  const itemKey = `${set}-${index}`
  const isHovered = hoveredItem.value === itemKey

  return {
    'outline': isHovered,
    'outline-offset-2': isHovered,
    'outline-accent': isHovered,
  }
}
</script>

<template>
  <div class="relative overflow-hidden py-4" :class="orientation === 'vertical' ? 'h-full h-min-80' : ''">
    <!-- Left/Top mask -->
    <div
      v-if="orientation === 'horizontal'"
      class="pointer-events-none absolute bottom-4 left-0 top-4 z-10 w-32 bg-linear-to-r from-black/20 to-transparent"
    />
    <div
      v-if="orientation === 'vertical'"
      class="pointer-events-none absolute left-0 right-0 top-0 z-10 h-25 bg-linear-to-b from-black/20 to-transparent"
    />

    <!-- Right/Bottom mask -->
    <div
      v-if="orientation === 'horizontal'"
      class="pointer-events-none absolute bottom-4 right-0 top-4 z-10 w-32 bg-linear-to-l from-black/20 to-transparent"
    />
    <div
      v-if="orientation === 'vertical'"
      class="pointer-events-none absolute left-0 right-0 bottom-0 z-10 h-25 bg-linear-to-t from-black/20 to-transparent"
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
        :style="{ animationDuration: `${speed}s` }"
      >
        <div
          v-for="(item, index) in items"
          :key="`${set}-${index}`"
          class="group relative rounded-lg border border-border bg-card p-6 transition-all duration-300 ml-2 mr-2"
          :class="[
            getItemClasses(set, index),
            orientation === 'horizontal' ? 'min-w-75' : 'mb-2 mt-2',
          ]"
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

@keyframes marquee-vertical {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}

.animate-marquee-vertical {
  animation: marquee-vertical 30s linear infinite;
}

.direction-reverse {
  animation-direction: reverse;
}

.paused {
  animation-play-state: paused;
}
</style>
