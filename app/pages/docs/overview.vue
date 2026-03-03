<script setup lang="ts">
import type { Collections } from '@nuxt/content'

definePageMeta({
  name: 'overview',
  path: '/docs/overview',
})

const { locale } = useI18n()

const { data: page } = await useAsyncData(`overview-${locale.value}`, async () => {
  const collection = (`content_${locale.value}`) as keyof Collections
  const content = await queryCollection(collection).path('/overview').first()
  if (!content && locale.value !== 'en') {
    return await queryCollection('content_en').path('/overview').first()
  }
  return content
}, {
  watch: [locale],
})
</script>

<template>
  <PartialsDocsProseContent :value="page" />
</template>
