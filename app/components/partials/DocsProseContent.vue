<script setup lang="ts">
import type { ContentEnCollectionItem, ContentEsCollectionItem } from '@nuxt/content'
import DocsNotFound from './DocsNotFound.vue'

defineProps<{
  value: ContentEnCollectionItem | ContentEsCollectionItem | null | undefined
}>()
</script>

<template>
  <article
    v-if="value"
    class="prose max-w-none dark:prose-invert
           prose-headings:scroll-m-20 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground
           prose-h1:text-4xl prose-h2:text-3xl prose-h2:border-b prose-h2:pb-2 prose-h3:text-2xl prose-h4:text-xl
           prose-p:leading-7 prose-p:text-muted-foreground
           prose-a:font-medium prose-a:text-primary prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-primary/80
           prose-blockquote:mt-6 prose-blockquote:border-l-2 prose-blockquote:border-border prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground
           prose-code:relative prose-code:rounded prose-code:bg-secondary prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:text-sm prose-code:font-semibold prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none
           prose-pre:bg-secondary prose-pre:text-foreground prose-pre:border prose-pre:border-border
           prose-strong:font-semibold prose-strong:text-foreground
           prose-ul:my-6 prose-ul:ml-6 prose-ul:list-disc prose-ul:text-foreground/90
           prose-ol:my-6 prose-ol:ml-6 prose-ol:list-decimal prose-ol:text-foreground/90
           prose-li:mt-2
           prose-img:rounded-md prose-img:border"
  >
    <ContentRenderer :value="value" />
  </article>

  <DocsNotFound v-else />
</template>
