<script setup lang="ts">
definePageMeta({
  name: 'component-content-page',
})

const { params } = useRoute('component-content-page')
const { locale } = useI18n()

const { data } = await useAsyncData(`component-${params.slug}-${locale.value}`, () => {
  return queryCollection(`content_${locale.value}`).path(`/${params.slug}`).first()
}, {
  watch: [locale],
})
</script>

<template>
  <PartialsDocsProseContent :value="data" />
</template>
