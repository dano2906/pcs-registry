<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <div class="w-full font-inter py-8 px-2 relative">
    <div class="max-w-5xl mx-auto container">
      <PartialsHeader />
      <slot />
      <PartialsFooter />
    </div>
    <PartialsGoToTop />
  </div>
  <Toaster rich-colors />
</template>
