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
  <div class="w-full bg-muted/30 p-2.5 rounded-sm flex flex-row items-center justify-between gap-5 hover:bg-muted/60 transition-colors">
    <div class="flex flex-row items-center justify-start gap-5 w-full">
      <RadioGroupItem :id="option.value" :value="option.value" />
      <Label :for="option.value" class="w-full text-muted-foreground text-base flex flex-col items-start justify-start gap-0.5">
        {{ option.title }}
        <span v-if="option.subtitle" class="text-muted-foreground/80 text-sm">{{ option.subtitle }}</span>
      </Label>
    </div>
    <slot name="icon" />
  </div>
</template>
