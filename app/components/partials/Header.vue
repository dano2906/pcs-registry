<script setup lang="ts">
const isFixed = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    isFixed.value = window.scrollY > 20
  })
})
</script>

<template>
  <header
    class="flex items-center justify-between w-full mx-auto container max-w-5xl rounded-md p-2 sticky top-4 transition-all duration-300 ease-in-out bg-muted/60 backdrop-blur-sm z-50 shadow"
    :class="{ 'bg-muted/10 shadow-none': isFixed }"
  >
    <img src="/logo.svg" alt="Pieces logo" class="h-8 w-auto">
    <PartialsThemeSelector />
  </header>
</template>
