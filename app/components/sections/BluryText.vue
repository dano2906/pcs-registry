<script lang="ts" setup>
import BluryText from '~/registry/blury-text/BluryText.vue'
</script>

<template>
  <PartialsSection id="blury-text" component-name="blury-text" description="Componente de texto con animaciones de blur." title="Blury Text" :registry-dependencies="[]">
    <template #example>
      <div class="flex flex-col flex-wrap items-start justify-start gap-2">
        <BluryText
          animation="blurInUp"
          by="character"
          text="Welcome to my website"
          class="text-4xl font-bold"
        />

        <BluryText
          animation="slideLeft"
          by="word"
          text="This is an awesome Vue port."
          :delay="0.5"
        />
      </div>
    </template>
  </PartialsSection>
</template>
