<script setup lang="ts">
import Typography from '~/registry/typhography/Typography.vue'

const { titleKey, subtitleKey } = defineProps<{
  titleKey: string
  subtitleKey: string
}>()
</script>

<template>
  <div class="w-full max-w-5xl mx-auto flex flex-col items-start justify-start gap-4 py-2">
    <Typography variant="h1" :text="$t(titleKey)" class="text-foreground" />
    <Typography variant="span" :text="$t(subtitleKey)" class="text-muted-foreground" />
    <div class="w-full mt-4">
      <slot />
    </div>
  </div>
</template>
