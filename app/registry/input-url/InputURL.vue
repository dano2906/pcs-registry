<script setup lang="ts">
import { InfoIcon } from 'lucide-vue-next'
import { computed } from 'vue'

interface Props {
  protocol?: string
  hint?: string
  placeholder?: string
  modelValue?: string
  disabled?: boolean
  id?: string
  name?: string
}

const props = withDefaults(defineProps<Props>(), {
  protocol: 'https://',
  placeholder: 'example.com',
  modelValue: '',
})

const emit = defineEmits<{
  (e: 'update:modelValue', payload: string): void
}>()

const pathname = computed({
  get() {
    if (!props.modelValue)
      return ''
    return props.modelValue.startsWith(props.protocol)
      ? props.modelValue.slice(props.protocol.length)
      : props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue ? `${props.protocol}${newValue}` : '')
  },
})
</script>

<template>
  <InputGroup>
    <InputGroupInput
      :id="props.id"
      v-model="pathname"
      :name="props.name"
      :placeholder="props.placeholder"
      :disabled="props.disabled"
      class="pl-1 text-foreground"
    />

    <InputGroupAddon>
      <InputGroupText>{{ props.protocol }}</InputGroupText>
    </InputGroupAddon>

    <InputGroupAddon align="inline-end">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <InputGroupButton class="rounded-full" size="icon-xs" :disabled="props.disabled">
              <InfoIcon class="size-4" />
            </InputGroupButton>
          </TooltipTrigger>
          <TooltipContent v-if="props.hint">
            {{ props.hint }}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </InputGroupAddon>
  </InputGroup>
</template>
