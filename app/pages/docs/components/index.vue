<script setup lang="ts">
definePageMeta({
  name: 'component-list-page',
})

const components = [
  {
    label: 'Action Button',
    href: '/docs/components/action-button',
  },
  {
    label: 'Async Multi Select',
    href: '/docs/components/async-multi-select',
  },
  {
    label: 'Auth Modal',
    href: '/docs/components/auth-modal',
  },
  {
    label: 'Blurry Text',
    href: '/docs/components/blury-text',
  },
  {
    label: 'Currency Selector',
    href: '/docs/components/currency-selector',
  },
  {
    label: 'Date Picker',
    href: '/docs/components/date-picker',
  },
  {
    label: 'File Input',
    href: '/docs/components/file-input',
  },
  {
    label: 'Filter Selection',
    href: '/docs/components/filter-selection',
  },
  {
    label: 'Form Builder',
    href: '/docs/components/form-builder',
  },
  {
    label: 'Hyper Text',
    href: '/docs/components/hyper-text',
  },
  {
    label: 'Input Password',
    href: '/docs/components/input-password',
  },
  {
    label: 'Input URL',
    href: '/docs/components/input-url',
  },
  {
    label: 'Loading Swap',
    href: '/docs/components/loading-swap',
  },
  {
    label: 'Marquee',
    href: '/docs/components/marquee',
  },
  {
    label: 'Multi Select',
    href: '/docs/components/multi-select',
  },
  {
    label: 'Number Input',
    href: '/docs/components/number-input',
  },
  {
    label: 'Pricing Card',
    href: '/docs/components/pricing-card',
  },
  {
    label: 'Slider Range',
    href: '/docs/components/slider-range',
  },
  {
    label: 'Spotlight Card',
    href: '/docs/components/spotlight-card',
  },
  {
    label: 'Tel input',
    href: '/docs/components/tel-input',
  },
  {
    label: 'Timeline',
    href: '/docs/components/timeline',
  },
  {
    label: 'Typography',
    href: '/docs/components/typography',
  },
]
</script>

<template>
  <div class="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-8 my-4">
    <NuxtLink
      v-for="component in components"
      :key="component.href"
      :to="component.href"
      class="relative inline-block text-foreground hover:text-primary transition-colors duration-300 group py-1"
    >
      {{ component.label }}
      <span class="absolute left-0 bottom-0 w-0 bg-primary h-[2px] transition-all duration-300 group-hover:w-full" />
    </NuxtLink>
  </div>
  <div class="w-full flex items-center justify-end my-8">
    <NuxtLink to="/docs/overview" class="text-primary underline decoration-primary font-medium py-2 px-4">
      {{ $t('overview.title') }}
    </NuxtLink>
    <NuxtLink to="/docs/contributing" class="text-primary underline decoration-primary font-medium py-2 px-4">
      {{ $t('contributing.title') }}
    </NuxtLink>
  </div>
</template>
