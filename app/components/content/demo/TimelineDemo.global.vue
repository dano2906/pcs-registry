<script setup lang="ts">
import Timeline from '@/registry/timeline/Timeline.vue'

const experience = [
  {
    date: 'Jan 2024 - Present',
    title: 'Senior Frontend Developer',
    description: 'Lead developer for the design system and core registry components. Responsible for architectural decisions and team mentoring.',
    badge: 'Current',
    link: { text: 'View Portfolio', url: '#' },
  },
  {
    date: 'Jun 2022 - Dec 2023',
    title: 'Full Stack Engineer',
    description: 'Developed and maintained various web applications using Nuxt, Vue 3, and Node.js. Optimized database queries and improved application performance by 40%.',
    badge: 'Remote',
  },
  {
    date: 'Sep 2020 - May 2022',
    title: 'Junior Web Developer',
    description: 'Started my career as a junior developer focusing on pixel-perfect UI implementations and learning modern JavaScript frameworks.',
    link: { text: 'Company Profile', url: '#' },
  },
]
</script>

<template>
  <div class="flex flex-col items-center justify-center p-12 bg-muted/20 rounded-xl border max-w-4xl mx-auto overflow-hidden">
    <div class="w-full space-y-4 max-w-2xl border rounded-2xl bg-background shadow-2xl p-12">
      <h4 class="text-xs font-bold uppercase text-muted-foreground mb-12 tracking-widest text-center border-b pb-6">
        Professional Experience
      </h4>
      <Timeline :items="experience" />
    </div>
  </div>
</template>
