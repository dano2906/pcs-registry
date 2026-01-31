<script setup lang="ts">
import LogoIcon from '~/assets/svg/logo.svg'

const isFixed = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    isFixed.value = window.scrollY > 20
  })
})
</script>

<template>
  <header
    class="flex items-center justify-between w-full mx-auto container max-w-5xl rounded-md px-2 py-0.5 sticky top-4 transition-all duration-300 ease-in-out bg-muted/60 backdrop-blur-sm z-50 shadow"
    :class="{ 'bg-muted/10 shadow-none': isFixed }"
  >
    <NuxtLink to="/">
      <LogoIcon class="text-5xl text-primary my-1 p-0" />
    </NuxtLink>
    <div class="flex items-center justify-center gap-2">
      <PartialsLangSelector />
      <PartialsThemeSelector />
      <slot name="sidebar-trigger" />
    </div>
  </header>
</template>
