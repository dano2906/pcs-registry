<script setup lang="ts">
import { Copy, CopyCheck } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
})

const copied = ref(false)

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    toast.success('Code copied to clipboard')
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
  catch {
    toast.error('Failed to copy code to clipboard')
  }
}
</script>

<template>
  <div class="relative rounded-lg bg-secondary border border-secondary shadow-sm overflow-hidden py-0">
    <div class="flex justify-between items-center px-4 bg-accent border-b border-accent text-accent-foreground text-xs min-h-[40px]">
      <span>{{ filename || language || '' }}</span>

      <Button
        variant="secondary"
        size="icon-sm"
        class="absolute right-2 bg-muted text-muted-foreground shadow"
        @click="copyCode"
      >
        <Copy v-if="!copied" />
        <CopyCheck v-else />
      </Button>
    </div>

    <pre class="text-sm font-mono text-foreground shiki shiki-themes m-0! p-4 overflow-x-auto rounded-none border-none"><slot /></pre>
  </div>
</template>
