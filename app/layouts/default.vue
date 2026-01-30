<script setup lang="ts">
import GoToTop from '@/components/partials/GoToTop.vue'
import Header from '@/components/partials/Header.vue'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <div class="w-full font-inter py-8 px-2 relative">
    <div class="max-w-5xl mx-auto container">
      <Header />
      <slot />
    </div>
    <GoToTop />
  </div>
  <Toaster rich-colors />
</template>
