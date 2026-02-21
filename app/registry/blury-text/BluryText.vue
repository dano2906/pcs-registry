<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { cn } from '@/lib/utils'

type AnimationType
  = | 'fadeIn'
    | 'blurIn'
    | 'blurInUp'
    | 'blurInDown'
    | 'slideUp'
    | 'slideDown'
    | 'slideLeft'
    | 'slideRight'
    | 'scaleUp'
    | 'scaleDown'

interface Props {
  text: string
  class?: string
  segmentClass?: string
  as?: string
  delay?: number
  duration?: number
  animation?: AnimationType
  by?: 'text' | 'word' | 'character'
  startOnView?: boolean
  once?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  class: '',
  segmentClass: '',
  as: 'p',
  delay: 0,
  duration: 0.3,
  animation: 'fadeIn',
  by: 'word',
  startOnView: true,
  once: true,
})

const containerRef = ref<HTMLElement | null>(null)
const isShown = ref(false)
let observer: IntersectionObserver | null = null

const segments = computed(() => {
  if (props.by === 'character') {
    return props.text.split('')
  }
  if (props.by === 'word') {
    return props.text.split(' ')
  }
  return [props.text]
})

const itemVariants: Record<AnimationType, { hidden: any, show: any }> = {
  fadeIn: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    show: { opacity: 1, filter: 'blur(0px)' },
  },
  blurInUp: {
    hidden: { opacity: 0, filter: 'blur(10px)', transform: 'translateY(20px)' },
    show: { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' },
  },
  blurInDown: {
    hidden: { opacity: 0, filter: 'blur(10px)', transform: 'translateY(-20px)' },
    show: { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' },
  },
  slideUp: {
    hidden: { opacity: 0, transform: 'translateY(20px)' },
    show: { opacity: 1, transform: 'translateY(0)' },
  },
  slideDown: {
    hidden: { opacity: 0, transform: 'translateY(-20px)' },
    show: { opacity: 1, transform: 'translateY(0)' },
  },
  slideLeft: {
    hidden: { opacity: 0, transform: 'translateX(20px)' },
    show: { opacity: 1, transform: 'translateX(0)' },
  },
  slideRight: {
    hidden: { opacity: 0, transform: 'translateX(-20px)' },
    show: { opacity: 1, transform: 'translateX(0)' },
  },
  scaleUp: {
    hidden: { opacity: 0, transform: 'scale(0.5)' },
    show: { opacity: 1, transform: 'scale(1)' },
  },
  scaleDown: {
    hidden: { opacity: 0, transform: 'scale(1.5)' },
    show: { opacity: 1, transform: 'scale(1)' },
  },
}

function getSegmentStyle(index: number) {
  const variant = itemVariants[props.animation]
  const state = isShown.value ? variant.show : variant.hidden

  return {
    ...state,
    transitionDuration: `${props.duration}s`,
    transitionDelay: `${props.delay + index * 0.1}s`,
    transitionProperty: 'opacity, filter, transform',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: 'opacity, filter, transform',
  }
}

onMounted(() => {
  if (!props.startOnView) {
    requestAnimationFrame(() => {
      isShown.value = true
    })
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        isShown.value = true
        if (props.once && observer && containerRef.value) {
          observer.unobserve(containerRef.value)
        }
      }
      else if (!props.once) {
        isShown.value = false
      }
    },
    { threshold: 0.1 },
  )

  if (containerRef.value) {
    observer.observe(containerRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <component
    :is="as"
    ref="containerRef"
    :class="cn('whitespace-pre-wrap', props.class)"
  >
    <span
      v-for="(segment, i) in segments"
      :key="`${by}-${i}-${segment}`"
      :class="cn('inline-block', segmentClass)"
      :style="getSegmentStyle(i)"
    >
      {{ segment }}
      <span v-if="by === 'word' && i < segments.length - 1" class="inline-block">&nbsp;</span>
    </span>
  </component>
</template>
