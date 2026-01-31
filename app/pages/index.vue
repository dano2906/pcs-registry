<script setup lang="ts">
definePageMeta({
  layout: 'default',
  name: 'index',
})
</script>

<template>
  <main class="w-full py-28 px-2 min-h-screen flex flex-col items-center justify-start gap-7">
    <div
      className="absolute inset-0 -z-10"
      :style="{
        backgroundImage: `
        linear-gradient(45deg, transparent 49%, var(--accent) 49%, var(--accent) 51%, transparent 51%),
        linear-gradient(-45deg, transparent 49%, var(--accent) 49%, var(--accent) 51%, transparent 51%)
      `,
        backgroundSize: '40px 40px',
        WebkitMaskImage:
          'radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)',
        maskImage:
          'radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)',
      }"
    />
    <PartialsLastComponent />
    <h1 class="text-6xl lg:text-9xl font-black tracking-tight space-x-3 text-center">
      <span class="text-primary">Our</span>
      <span class="text-muted-foreground z-40">Pieces</span>
    </h1>
    <p class="text-muted-foreground text-sm md:text-base tracking-wide font-normal text-balance text-center">
      A library of visual components designed to  <span class="text-primary font-medium">work together</span>. Each piece is built to simplify and <span class="text-primary font-medium">speed up</span> your workflow without sacrificing flexibility.
    </p>
    <div class="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
      <NuxtLink to="/docs/overview" class="text-primary font-medium bg-primary/5 hover:text-primary/80 hover:bg-primary/5 backdrop-blur-xl transition border border-primary rounded-xl px-4 py-1 text-base lg:text-xl">
        Get started
      </NuxtLink>
      <NuxtLink to="/docs/components" class="text-muted-foreground bg-muted-foreground/5 font-medium hover:text-muted-foreground/80 hover:bg-muted-foreground/5 backdrop-blur-xl transition border border-muted-foreground rounded-xl px-4 py-1 text-base lg:text-xl">
        Components
      </NuxtLink>
    </div>
    <PartialsContribuitors />
  </main>
</template>
