<script setup lang="ts">
import { CalendarIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const props = defineProps<{
  modelValue?: any
  placeholder?: string
  disabled?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const date = computed({
  get: () => props.modelValue ? new Date(props.modelValue) : undefined,
  set: val => emit('update:modelValue', val),
})

function formatDate(d: any) {
  if (!d)
    return ''
  const dateObj = new Date(d)
  return dateObj.toLocaleDateString()
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'w-full justify-start text-left font-normal',
          !modelValue && 'text-muted-foreground',
        )"
        :disabled="disabled"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ modelValue ? formatDate(modelValue) : (placeholder || 'Pick a date') }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="date" initial-focus />
    </PopoverContent>
  </Popover>
</template>
