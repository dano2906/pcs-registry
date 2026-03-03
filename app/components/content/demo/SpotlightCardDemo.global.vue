<script setup lang="ts">
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-12 bg-muted/20 rounded-xl border max-w-6xl mx-auto overflow-hidden">
    <SpotlightCard class="h-64 shadow-lg hover:shadow-2xl transition-all duration-500">
      <SpotlightCardHeader>
        <SpotlightCardTitle>Standard Spotlight</SpotlightCardTitle>
        <SpotlightCardDescription>Mouse-tracking glow effect</SpotlightCardDescription>
      </SpotlightCardHeader>
      <SpotlightCardContent>
        A subtle glow follows your cursor across the card, highlighting the content.
      </SpotlightCardContent>
    </SpotlightCard>

    <SpotlightCardBeam class="h-64 shadow-lg hover:shadow-2xl transition-all duration-500 border-primary/20">
      <SpotlightCardHeader>
        <SpotlightCardTitle>Beam Effect</SpotlightCardTitle>
        <SpotlightCardDescription>Cross-beam cursor tracking</SpotlightCardDescription>
      </SpotlightCardHeader>
      <SpotlightCardContent>
        Dynamic light beams intersect at your cursor position, creating a futuristic tech aesthetic.
      </SpotlightCardContent>

      <SpotlightCardGradient
        class="h-64 shadow-lg hover:shadow-2xl transition-all duration-500 border-dashed border-primary/40"
        :gradient-colors="['#7877c6', '#5eead4', '#f472b6']"
      >
        <SpotlightCardHeader>
          <SpotlightCardTitle>Gradient Follow</SpotlightCardTitle>
          <SpotlightCardDescription>Multi-color liquid lighting</SpotlightCardDescription>
        </SpotlightCardHeader>
        <SpotlightCardContent>
          Beautiful fluid gradients shift and morph as you move your mouse over the surface.
        </SpotlightCardContent>

        <SpotlightCardTilt
          class="h-64 shadow-lg hover:shadow-2xl transition-all duration-500 bg-linear-to-br from-primary/5 to-primary/10"
          :max-tilt="15"
          :scale="1.05"
        >
          <SpotlightCardHeader>
            <SpotlightCardTitle>3D Tilt + Glow</SpotlightCardTitle>
            <SpotlightCardDescription>Interactive perspective</SpotlightCardDescription>
          </SpotlightCardHeader>
          <SpotlightCardContent>
            The card physically tilts in 3D space based on your mouse position, with a glare effect.
          </SpotlightCardContent>
        </SpotlightCardTilt>
      </SpotlightCardGradient>
    </SpotlightCardBeam>
  </div>
</template>
