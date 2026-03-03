<script setup lang="ts">
import HyperText from '@/registry/hyper-text/HyperText.vue'
</script>

<template>
  <div class="space-y-12 p-12 bg-muted/10 rounded-lg border text-center">
    <div>
      <h4 class="text-xs font-bold uppercase text-muted-foreground mb-4 tracking-widest">
        Hover Trigger
      </h4>
      <HyperText
        text="Hover to Reveal"
        trigger="hover"
        classes="text-4xl font-bold justify-center"
      />
    </div>

    <div class="border-t pt-12">
      <h4 class="text-xs font-bold uppercase text-muted-foreground mb-4 tracking-widest">
        Slow Speed & Custom Colors
      </h4>
      <HyperText
        text="Cyberpunk Decoding..."
        :duration="2000"
        :color-classes="{
          rendered: 'text-primary drop-shadow-[0_0_8px_rgba(120,119,198,0.5)]',
          rendering: 'text-muted-foreground animate-pulse',
        }"
        classes="text-3xl font-mono justify-center"
      />
    </div>

    <div class="border-t pt-12">
      <h4 class="text-xs font-bold uppercase text-muted-foreground mb-4 tracking-widest">
        Scroll Trigger (Default)
      </h4>
      <HyperText
        text="Automatic Reveal on Scroll"
        classes="text-2xl font-semibold justify-center"
      />
    </div>
  </div>
</template>
