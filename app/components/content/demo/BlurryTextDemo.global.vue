<script setup lang="ts">
import BlurryText from '@/registry/blurry-text/BlurryText.vue'
</script>

<template>
  <div class="space-y-8 p-4 bg-muted/20 rounded-lg border">
    <div>
      <h4 class="text-xs font-bold uppercase text-muted-foreground mb-2 tracking-widest">
        Default (Word)
      </h4>
      <BlurryText text="Animated text with subtle blur effects for each word" class="text-2xl font-semibold" />
    </div>

    <div>
      <h4 class="text-xs font-bold uppercase text-muted-foreground mb-2 tracking-widest">
        Character with Slide Up
      </h4>
      <BlurryText
        text="Smooth character animation"
        animation="slideUp"
        by="character"
        class="text-xl font-medium"
      />
    </div>

    <div>
      <h4 class="text-xs font-bold uppercase text-muted-foreground mb-2 tracking-widest">
        Slow Scale Up
      </h4>
      <BlurryText
        text="Expanding horizons"
        animation="scaleUp"
        :duration="1"
        class="text-3xl font-bold text-primary"
      />
    </div>
  </div>
</template>
