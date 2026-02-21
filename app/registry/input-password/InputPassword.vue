<script setup lang="ts">
import { Eye, EyeClosed } from 'lucide-vue-next'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'

const { placeholder, disabled = false } = defineProps<{
  placeholder?: string | undefined
  disabled?: boolean
}>()

const field = defineModel<string | undefined>(undefined)

const type = ref('password')

function reverse() {
  type.value = type.value === 'password' ? 'text' : 'password'
}
</script>

<template>
  <InputGroup>
    <InputGroupInput v-model="field" :placeholder :type :disabled />
    <InputGroupAddon align="inline-end">
      <InputGroupButton
        :aria-label="type === 'password' ? 'Show password' : 'Hide password'"
        :title="type === 'password' ? 'Show password' : 'Hide password'"
        size="icon-xs"
        :disabled
        type="button"
        @click="reverse"
      >
        <Eye v-if="type === 'password'" />
        <EyeClosed v-if="type === 'text'" />
      </InputGroupButton>
    </InputGroupAddon>
  </InputGroup>
</template>
