<script setup lang="ts">
import FileInput from '@/registry/file-input/FileInput.vue'

const files1 = ref([])
const files2 = ref([])
</script>

<template>
  <div class="space-y-8 p-8 bg-muted/20 rounded-lg border">
    <div class="space-y-2">
      <h4 class="text-sm font-semibold mb-4">
        Multiple Files (All Types)
      </h4>
      <FileInput v-model="files1" :multiple="true" />
    </div>

    <div class="space-y-2 border-t pt-8">
      <h4 class="text-sm font-semibold mb-4">
        Images Only (Max 2MB)
      </h4>
      <FileInput
        v-model="files2"
        :multiple="true"
        :accept="['image/*']"
        :max-size="1024 * 1024 * 2"
      />
    </div>

    <div v-if="files1.length > 0 || files2.length > 0" class="col-span-full pt-4 border-t text-sm text-muted-foreground">
      Total files selected: <span class="font-bold text-foreground">{{ files1.length + files2.length }}</span>
    </div>
  </div>
</template>
