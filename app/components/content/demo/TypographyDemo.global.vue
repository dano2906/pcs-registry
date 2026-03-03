<script setup lang="ts">
import Typography from '@/registry/typography/Typography.vue'
</script>

<template>
  <div class="space-y-12 p-12 bg-muted/20 rounded-xl border max-w-5xl mx-auto overflow-hidden">
    <div class="space-y-6">
      <h4 class="text-xs font-bold uppercase text-muted-foreground mb-6 tracking-widest text-center border-b pb-4">
        Standard Typography Variants
      </h4>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <div class="space-y-4">
          <Typography variant="h1" text="Heading Level 1" />
          <Typography variant="h2" text="Heading Level 2" />
          <Typography variant="h3" text="Heading Level 3" />
          <Typography variant="h4" text="Heading Level 4" />
        </div>

        <div class="space-y-6 border-t md:border-t-0 md:border-l pt-8 md:pt-0 md:pl-12">
          <div class="p-6 bg-background rounded-xl shadow-lg border-primary/20 border-l-4">
            <Typography variant="p" text="Paragraph text with standard leading and spacing. It handles multi-line content gracefully with consistent margins." />
          </div>

          <div class="p-6 bg-muted/40 rounded-xl border border-dashed italic">
            <Typography variant="blockquote" text="This is a blockquote variant, used to highlight important quotes or citations in the content." />
          </div>

          <div class="flex gap-4 items-center">
            <span class="text-xs font-bold text-muted-foreground uppercase tracking-widest">Inline:</span>
            <Typography variant="span" text="Simple span text variant for smaller UI labels." />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
