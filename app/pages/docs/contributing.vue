<script setup lang="ts">
import type { Collections } from '@nuxt/content'

definePageMeta({
  name: 'contributing',
  path: '/docs/contributing',
})

const { locale } = useI18n()

const { data: page } = await useAsyncData(`contributing-${locale.value}`, async () => {
  const collection = (`content_${locale.value}`) as keyof Collections
  const content = await queryCollection(collection).path('/contributing').first()
  if (!content && locale.value !== 'en') {
    return await queryCollection('content_en').path('/contributing').first()
  }
  return content
}, {
  watch: [locale],
})
</script>

<template>
  <PartialsDocsProseContent :value="page" />
</template>
