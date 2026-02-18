<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'

interface Props {
  text: string
  duration?: number
  classes?: string
  characterSet?: string
  trigger?: 'visible' | 'hover'
  colorClasses?: Record<'rendered' | 'rendering', string>
}

const {
  duration = 800,
  characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+',
  classes = '',
  trigger = 'visible',
  text,
  colorClasses = {
    rendered: 'text-foreground',
    rendering: 'text-muted-foreground',
  },
} = defineProps<Props>()

const displayText = ref<string[]>(text.split(''))
const iterations = ref(0)
const targetRef = ref<HTMLElement | null>(null)
let interval: ReturnType<typeof setInterval> | null = null

function startAnimation() {
  if (interval)
    clearInterval(interval)

  iterations.value = 0
  interval = setInterval(() => {
    if (iterations.value < text.length) {
      displayText.value = text.split('').map((l, i) => {
        if (l === ' ')
          return l

        if (i <= iterations.value) {
          return text[i]
        }

        return characterSet[Math.floor(Math.random() * characterSet.length)]
      })
      iterations.value += 0.1
    }
    else {
      displayText.value = text.split('')
      if (interval)
        clearInterval(interval)
    }
  }, duration / (text.length * 10))
}

let observer: IntersectionObserver | null = null

watch(targetRef, (el) => {
  if (!el)
    return

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startAnimation()
        observer?.disconnect()
      }
    })
  })

  observer.observe(el)
})

function handleMouseEnter() {
  if (trigger === 'hover')
    startAnimation()
}

onUnmounted(() => {
  if (interval)
    clearInterval(interval)
  if (observer)
    observer.disconnect()
})
</script>

<template>
  <div
    ref="targetRef"
    class="flex flex-wrap cursor-default overflow-hidden py-2"
    :aria-label="text"
    role="heading"
    aria-live="polite"
    :class="classes"
    @mouseenter="handleMouseEnter"
  >
    <span
      v-for="(letter, i) in displayText"
      :key="i"
      aria-hidden="true"
      class="min-w-[0.1em] transition-colors duration-75 whitespace-pre"
      :class="[i <= iterations && colorClasses.rendered,
               i > iterations && colorClasses.rendering]"
    >
      {{ letter === ' ' ? '\u00A0' : letter }}
    </span>
  </div>
</template>
