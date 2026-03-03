<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import { DateFormatter, getLocalTimeZone, parseDate, today } from '@internationalized/date'

import { CalendarIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const props = defineProps<{
  modelValue?: string
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', payload: string): void
}>()

const defaultPlaceholder = today(getLocalTimeZone())
const date = ref<DateValue>()

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    try {
      date.value = parseDate(newVal)
    }
    catch {
      // Ignore invalid date strings
    }
  }
  else {
    date.value = undefined
  }
}, { immediate: true })

watch(date, (newVal) => {
  emit('update:modelValue', newVal ? newVal.toString() : '')
})
</script>

<template>
  <Popover v-slot="{ close }">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn('w-[240px] justify-start text-left font-normal', !date && 'text-muted-foreground')"
      >
        <CalendarIcon />
        {{ date ? df.format(date.toDate(getLocalTimeZone())) : props.placeholder ?? "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0" align="start">
      <Calendar
        v-model="date"
        :default-placeholder="defaultPlaceholder"
        layout="month-and-year"
        initial-focus
        @update:model-value="close"
      />
    </PopoverContent>
  </Popover>
</template>
