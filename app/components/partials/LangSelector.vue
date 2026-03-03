<script setup lang="ts">
import { Check, Languages } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const { locales, setLocale, locale } = useI18n()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        size="icon"
        class="h-9 w-9 rounded-full bg-accent/50 transition-all hover:ring-2 hover:ring-primary/20"
      >
        <Languages class="size-4 text-foreground/80 transition-transform hover:scale-110" />
        <span class="sr-only">Toggle language</span>
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="w-32 rounded-xl">
      <DropdownMenuItem
        v-for="l in locales"
        :key="l.code"
        class="flex cursor-pointer items-center justify-between rounded-lg font-medium"
        :class="locale === l.code ? 'bg-primary/10 text-primary' : 'text-muted-foreground'"
        @click="setLocale(l.code)"
      >
        <span>{{ l.name }}</span>
        <Check
          class="size-4 transition-all"
          :class="locale === l.code ? 'opacity-100 scale-100' : 'opacity-0 scale-50'"
        />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
