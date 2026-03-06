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
           [&_h1:not([class])]:scroll-m-20 [&_h1:not([class])]:font-semibold [&_h1:not([class])]:tracking-tight [&_h1:not([class])]:text-foreground [&_h1:not([class])]:text-4xl
           [&_h2:not([class])]:scroll-m-20 [&_h2:not([class])]:font-semibold [&_h2:not([class])]:tracking-tight [&_h2:not([class])]:text-foreground [&_h2:not([class])]:text-3xl [&_h2:not([class])]:border-b [&_h2:not([class])]:pb-2
           [&_h3:not([class])]:scroll-m-20 [&_h3:not([class])]:font-semibold [&_h3:not([class])]:tracking-tight [&_h3:not([class])]:text-foreground [&_h3:not([class])]:text-2xl
           [&_h4:not([class])]:scroll-m-20 [&_h4:not([class])]:font-semibold [&_h4:not([class])]:tracking-tight [&_h4:not([class])]:text-foreground [&_h4:not([class])]:text-xl
           [&_p:not([class])]:leading-7 [&_p:not([class])]:text-muted-foreground
           [&_a:not([class])]:font-medium [&_a:not([class])]:text-primary [&_a:not([class])]:underline [&_a:not([class])]:underline-offset-4 hover:[&_a:not([class])]:text-primary/80
           [&_blockquote:not([class])]:mt-6 [&_blockquote:not([class])]:border-l-2 [&_blockquote:not([class])]:border-border [&_blockquote:not([class])]:pl-6 [&_blockquote:not([class])]:italic [&_blockquote:not([class])]:text-muted-foreground
           [&_code:not([class])]:relative [&_code:not([class])]:rounded [&_code:not([class])]:bg-secondary [&_code:not([class])]:px-[0.3rem] [&_code:not([class])]:py-[0.2rem] [&_code:not([class])]:text-sm [&_code:not([class])]:font-semibold [&_code:not([class])]:text-foreground [&_code:not([class])]:before:content-none [&_code:not([class])]:after:content-none
           [&_pre:not([class])]:bg-secondary [&_pre:not([class])]:text-foreground [&_pre:not([class])]:border [&_pre:not([class])]:border-border
           [&_strong:not([class])]:font-semibold [&_strong:not([class])]:text-foreground
           [&_ul:not([class])]:my-6 [&_ul:not([class])]:ml-6 [&_ul:not([class])]:list-disc [&_ul:not([class])]:text-foreground/90
           [&_ol:not([class])]:my-6 [&_ol:not([class])]:ml-6 [&_ol:not([class])]:list-decimal [&_ol:not([class])]:text-foreground/90
           [&_li:not([class])]:mt-2
           [&_img:not([class])]:rounded-md [&_img:not([class])]:border"
  >
    <ContentRenderer :value="value" />
  </article>

  <DocsNotFound v-else />
</template>
