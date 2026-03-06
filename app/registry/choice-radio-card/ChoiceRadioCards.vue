<script setup lang="ts" generic="T extends string">
import HiddenRadioCard from './HiddenRadioCard.vue'
import StandardRadioCard from './StandardRadioCard.vue'

interface Props {
  type?: 'standard' | 'hidden'
  options: {
    title: string
    value: T
    subtitle?: string
    icon?: any
  }[]
  defaultValue?: T
}

const { options, type = 'standard', defaultValue } = defineProps<Props>()

const selectedOption = defineModel<string | undefined>()

const types = {
  standard: StandardRadioCard,
  hidden: HiddenRadioCard,
}
</script>

<template>
  <RadioGroup v-model="selectedOption" :default-value="defaultValue">
    <component
      :is="types[type]"
      v-for="option in options"
      :key="option.value"
      :option="option"
    >
      <template #icon>
        <slot name="icon" :option="option">
          <component :is="option.icon" v-if="option.icon" class="size-6" />
        </slot>
      </template>
    </component>
  </RadioGroup>
</template>
