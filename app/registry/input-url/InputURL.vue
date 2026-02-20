<script setup lang="ts">
import { InfoIcon } from 'lucide-vue-next'
import { computed } from 'vue'

interface Props {
  protocol?: string
  hint: string
  placeholder?: string
}

const { protocol = 'https://', hint, placeholder = 'example.com' } = defineProps<Props>()

const model = defineModel<string | undefined>()
const pathname = computed({
  get() {
    if (!model.value)
      return ''
    return model.value.startsWith(protocol)
      ? model.value.slice(protocol.length)
      : model.value
  },
  set(newValue) {
    model.value = newValue ? `${protocol}${newValue}` : undefined
  },
})
</script>

<template>
  <InputGroup>
    <InputGroupInput v-model="pathname" :placeholder="placeholder" class="pl-1" />

    <InputGroupAddon>
      <InputGroupText>{{ protocol }}</InputGroupText>
    </InputGroupAddon>

    <InputGroupAddon align="inline-end">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <InputGroupButton class="rounded-full" size="icon-xs">
              <InfoIcon class="size-4" />
            </InputGroupButton>
          </TooltipTrigger>
          <TooltipContent>{{ hint }}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </InputGroupAddon>
  </InputGroup>
</template>
