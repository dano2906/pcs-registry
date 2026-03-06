<script setup lang="ts">
const { option } = defineProps<{
  option: {
    title: string
    value: string
    subtitle?: string
  }
}>()
</script>

<template>
  <Label
    :for="option.value"
    class="relative flex cursor-pointer flex-col items-center justify-center rounded-lg border border-input bg-muted/30 p-2 text-start shadow-sm transition-all hover:bg-muted/60 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
  >
    <slot name="icon" />
    <RadioGroupItem :id="option.value" :value="option.value" class="sr-only" />
    <span class="text-base font-bold text-muted-foreground">{{ option.title }}</span>
    <span v-if="option.subtitle" class="text-sm text-muted-foreground/80">{{ option.subtitle }}</span>
  </Label>
</template>
