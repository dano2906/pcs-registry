<script setup lang="ts">
import { Calendar } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export interface TimelineItem {
  date: string
  title: string
  description: string
  badge?: string
  link?: {
    text: string
    url: string
  }
}

const { items = [] } = defineProps<{
  items?: TimelineItem[]
}>()
</script>

<template>
  <ol class="relative border-s border-border">
    <li
      v-for="(item, index) in items"
      :key="index"
      class="ms-6"
      :class="[index !== items.length - 1 && 'mb-10']"
    >
      <span class="absolute flex items-center justify-center w-6 h-6 bg-accent rounded-full -start-3 ring-8 ring-background">
        <Calendar class="w-3 h-3 text-accent-foreground" />
      </span>

      <time class="bg-secondary border border-border text-foreground text-xs font-medium px-1.5 py-0.5 rounded">
        {{ item.date }}
      </time>

      <h3 class="flex items-center mb-1 text-lg font-semibold text-foreground my-2">
        {{ item.title }}
        <Badge v-if="item.badge" class="ms-2" variant="secondary">
          {{ item.badge }}
        </Badge>
      </h3>

      <p class="mb-4 text-muted-foreground">
        {{ item.description }}
      </p>

      <Button
        v-if="item.link"
        variant="outline"
        size="sm"
        as-child
      >
        <a :href="item.link.url">
          {{ item.link.text }}
        </a>
      </Button>
    </li>
  </ol>
</template>
