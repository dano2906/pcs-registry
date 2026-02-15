<script setup lang="ts">
definePageMeta({
  layout: 'default',
  name: 'index',
  scrollToTop: true,
})
</script>

<template>
  <main class="w-full py-28 px-2 min-h-screen flex flex-col items-center justify-start gap-10 **:selection:bg-accent">
    <div
      class="absolute inset-0 -z-10 hero-grid-top-right animate-fade-in"
    />
    <div
      class="absolute inset-0 -z-10 hero-grid-bottom-left animate-fade-in"
    />
    <PartialsLastComponent />
    <h1 class="text-6xl lg:text-9xl font-black tracking-tight space-x-3 text-center">
      <span class="text-primary">Our</span>
      <span class="text-muted-foreground z-40">Pieces</span>
    </h1>
    <p class="text-muted-foreground text-sm md:text-base tracking-wide font-normal text-balance text-center">
      {{ $t('description.content_1') }}<span class="text-primary font-medium">{{ $t('description.content_2') }}</span> {{ $t('description.content_3') }} <span class="text-primary font-medium"> {{ $t('description.content_4') }}</span> {{ $t('description.content_5') }}
    </p>
    <div class="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
      <NuxtLink to="/docs/overview" class="text-primary font-medium bg-primary/5 hover:text-primary/80 hover:bg-primary/5 backdrop-blur-xl transition border border-primary rounded-xl px-4 py-1 text-base lg:text-xl min-w-40 text-center">
        {{ $t('call_to_action_1') }}
      </NuxtLink>
      <NuxtLink to="/docs/components" class="text-muted-foreground bg-muted-foreground/5 font-medium hover:text-muted-foreground/80 hover:bg-muted-foreground/5 backdrop-blur-xl transition border border-muted-foreground rounded-xl px-4 py-1 text-base lg:text-xl min-w-40 text-center">
        {{ $t('call_to_action_2') }}
      </NuxtLink>
    </div>
    <PartialsContribuitors />
  </main>
</template>

<style scoped>
.hero-grid-top-right {
  background-image:
    linear-gradient(45deg, transparent 49%, var(--accent) 49%, var(--accent) 51%, transparent 51%),
    linear-gradient(-45deg, transparent 49%, var(--accent) 49%, var(--accent) 51%, transparent 51%);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%);
  -webkit-mask-image: radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%);
}

.hero-grid-bottom-left {
  background-image:
    linear-gradient(45deg, transparent 49%, var(--accent) 49%, var(--accent) 51%, transparent 51%),
    linear-gradient(-45deg, transparent 49%, var(--accent) 49%, var(--accent) 51%, transparent 51%);
  background-size: 40px 40px;

  mask-image: radial-gradient(
    ellipse 80% 80% at 0% 100%,
    #000 50%,
    transparent 90%
  );
  -webkit-mask-image: radial-gradient(
    ellipse 80% 80% at 0% 100%,
    #000 50%,
    transparent 90%
  );
}
</style>
