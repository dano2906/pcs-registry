<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  useForwardPropsEmits,
} from 'reka-ui'
import { computed } from 'vue'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<Omit<SliderRootProps, 'modelValue'> & {
  class?: HTMLAttributes['class']
  modelValue?: number | number[] | null
  stepTicks?: boolean
}>(), {
  min: 0,
  max: 100,
  step: 1,
  modelValue: () => [0],
  stepTicks: false,
})

const emits = defineEmits<SliderRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const internalModelValue = computed(() => {
  if (Array.isArray(props.modelValue))
    return props.modelValue
  return [props.modelValue ?? props.min ?? 0]
})

const ticks = computed(() => {
  if (!props.stepTicks)
    return
  if (props.step <= 0)
    return []
  const range = props.max - props.min
  const steps = Math.floor(range / props.step)
  if (steps > 50)
    return []
  return Array.from({ length: steps + 1 }, (_, i) => {
    const value = props.min + i * props.step
    return { value, percent: ((value - props.min) / range) * 100 }
  })
})
</script>

<template>
  <div :class="cn('flex w-full items-center gap-4', props.class)">
    <span class="text-xs text-muted-foreground">{{ min }}</span>
    <SliderRoot
      v-bind="forwarded"
      :model-value="internalModelValue"
      :class="cn('relative flex w-full touch-none select-none items-center')"
    >
      <SliderTrack class="relative h-1 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderRange class="absolute h-full bg-primary" />
      </SliderTrack>
      <template v-if="props.stepTicks">
        <span
          v-for="tick in ticks"
          :key="tick.value"
          class="absolute h-1 w-1 bg-muted-foreground/40 top-1/2 -translate-x-1/2 -translate-y-1/2"
          :style="{ left: `${tick.percent}%` }"
        />
      </template>
      <TooltipProvider :delay-duration="0">
        <Tooltip v-for="(value, key) in internalModelValue" :key="key">
          <TooltipTrigger as-child>
            <SliderThumb
              class="block size-4 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            />
          </TooltipTrigger>
          <TooltipContent>
            {{ value }}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </SliderRoot>
    <span class="text-xs text-muted-foreground">{{ max }}</span>
  </div>
</template>
