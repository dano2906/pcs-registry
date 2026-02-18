<script lang="ts" setup>
import HyperText from '@/registry/hyper-text/HyperText.vue'
</script>

<template>
  <PartialsSection id="hyper-text" component-name="hyper-text" description="Componente de texto con animaciones." title="Hyper Text" :registry-dependencies="[]">
    <template #example>
      <div class="flex flex-col flex-wrap items-start justify-start gap-2">
        <HyperText text="This is an hyper text!!!" />
        <HyperText text="This is an hyper text with hover rerender!!!" trigger="hover" />
        <HyperText text="This is an hyper text with custom charset!!!" character-set="01" />
        <HyperText text="This is an hyper text with custom charset and custom duration!!!" :duration="2000" character-set="X" />
        <HyperText :duration="3000" classes="text-4xl" text="This is an hyper text with custom charset with custom duration and classes!!!" character-set="01" />
        <HyperText
          :duration="5000" classes="text-2xl" text="This is a hyper text with custom charset, custom duration, classes and colors!!!" character-set="01" :color-classes="{
            rendered: 'text-primary',
            rendering: 'text-accent',
          }"
        />
      </div>
    </template>
  </PartialsSection>
</template>
