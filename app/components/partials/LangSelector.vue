<script setup lang="ts">
import { Languages } from 'lucide-vue-next'

const { locales, setLocale, locale } = useI18n()
</script>

<template>
  <NativeSelect v-model="locale" :default-icon="false" class="z-50 bg-accent/50" @update:model-value="(e) => setLocale(e)">
    <template #icon>
      <Languages
        class="text-primary pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 opacity-50 select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </template>
    <NativeSelectOption v-for="l in locales" :key="l.code" :value="l.code">
      {{ l.name }}
    </NativeSelectOption>
  </NativeSelect>
</template>
