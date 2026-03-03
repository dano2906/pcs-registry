<script setup lang="ts">
import { Paintbrush } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu' // Adjust path if needed

const colorMode = useColorMode()

const themes = [
  { value: 'system', label: 'System', swatch: 'bg-gradient-to-br from-gray-300 to-gray-700' },
  { value: 'light', label: 'Light', swatch: 'bg-white border border-gray-200' },
  { value: 'dark', label: 'Dark', swatch: 'bg-zinc-900 border border-zinc-700' },
  { value: 'sea', label: 'Sea', swatch: 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]' },
  { value: 'forest', label: 'Forest', swatch: 'bg-emerald-600 shadow-[0_0_10px_rgba(5,150,105,0.4)]' },
  { value: 'volcanic', label: 'Volcanic', swatch: 'bg-orange-600 shadow-[0_0_10px_rgba(234,88,12,0.4)]' },
  { value: 'aurora', label: 'Aurora', swatch: 'bg-gradient-to-r from-purple-500 to-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.4)]' },
]
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        size="icon"
        class="z-50 size-9 rounded-full bg-accent/50 transition-colors hover:bg-accent/80 focus-visible:ring-primary/50"
      >
        <Paintbrush class="size-4 text-primary opacity-70" aria-hidden="true" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="z-50 min-w-[150px]">
      <DropdownMenuItem
        v-for="theme in themes"
        :key="theme.value"
        class="cursor-pointer transition-colors"
        @click="colorMode.preference = theme.value"
      >
        <div class="flex items-center gap-3 w-full py-0.5 group">
          <div
            class="size-4 rounded-full transition-transform group-hover:scale-110" :class="[
              theme.swatch,
            ]"
            aria-hidden="true"
          />

          <span
            class="font-medium tracking-tight flex-1"
            :class="{ 'font-bold text-primary': colorMode.preference === theme.value }"
          >
            {{ theme.label }}
          </span>
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
