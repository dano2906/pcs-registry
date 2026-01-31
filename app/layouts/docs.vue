<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <div class="w-full font-inter p-4 relative">
    <SidebarProvider>
      <PartialsDocsSidebar />
      <div class="w-full max-w-5xl mx-auto space-y-4">
        <PartialsHeader>
          <template #sidebar-trigger>
            <SidebarTrigger />
          </template>
        </PartialsHeader>
        <slot />
      </div>
    </SidebarProvider>
    <PartialsGoToTop />
  </div>
  <Toaster rich-colors />
</template>
