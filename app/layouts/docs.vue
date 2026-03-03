<script setup lang="ts">
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <div class="w-full font-inter p-4 relative">
    <SidebarProvider>
      <div class="w-full max-w-5xl mx-auto space-y-8">
        <PartialsHeader>
          <template #sidebar-trigger>
            <SidebarTrigger />
          </template>
        </PartialsHeader>
        <PartialsDocsSidebar />
        <slot />
      </div>
    </SidebarProvider>
    <PartialsGoToTop />

    <Toaster rich-colors />
  </div>
</template>
