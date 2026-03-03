<script setup lang="ts">
import Marquee from '@/registry/marquee/Marquee.vue'

const items = [
  { text: 'Logitech', icon: '🖱️' },
  { text: 'Razer', icon: '🐍' },
  { text: 'SteelSeries', icon: '⌨️' },
  { text: 'Asus ROG', icon: '💻' },
  { text: 'HyperX', icon: '🎧' },
  { text: 'Alienware', icon: '👽' },
]

const testimonials = [
  { name: 'John Doe', comment: 'Absolutely amazing product!', role: 'CEO, TechCorp' },
  { name: 'Jane Smith', comment: 'Fastest delivery ever!', role: 'Developer' },
  { name: 'Sam Wilson', comment: 'Support team is top-notch.', role: 'Designer' },
]
</script>

<template>
  <div class="space-y-12 p-8 bg-muted/20 rounded-lg border max-w-4xl mx-auto overflow-hidden">
    <div class="space-y-4">
      <h4 class="text-xs font-bold uppercase text-muted-foreground mb-4 tracking-widest text-center">
        Horizontal Orientation
      </h4>
      <Marquee :items="items" :speed="20">
        <template #default="{ item }">
          <div class="flex items-center gap-3 px-6 py-2">
            <span class="text-2xl drop-shadow-sm">{{ item.icon }}</span>
            <span class="text-lg font-bold tracking-tight">{{ item.text }}</span>
          </div>
        </template>
      </Marquee>
    </div>

    <div class="space-y-4 border-t pt-12">
      <h4 class="text-xs font-bold uppercase text-muted-foreground mb-4 tracking-widest text-center">
        Vertical Orientation
      </h4>
      <div class="h-80 flex items-center justify-center">
        <Marquee :items="testimonials" :speed="15" orientation="vertical" :repeats="4">
          <template #default="{ item }">
            <div class="w-72 space-y-2">
              <p class="text-sm font-medium text-foreground italic">
                "{{ item.comment }}"
              </p>
              <div class="pt-2 flex flex-col items-start gap-1">
                <span class="text-xs font-bold text-primary uppercase">{{ item.name }}</span>
                <span class="text-[10px] text-muted-foreground">{{ item.role }}</span>
              </div>
            </div>
          </template>
        </Marquee>
      </div>
    </div>
  </div>
</template>
