<script setup lang="ts">
import InputURL from '@/registry/input-url/InputURL.vue'

const url1 = ref('')
const url2 = ref('https://mywebsite.com')
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-12 p-12 bg-muted/20 rounded-xl border max-w-4xl mx-auto overflow-hidden">
    <div class="space-y-4">
      <h4 class="text-xs font-bold uppercase text-muted-foreground mb-6 tracking-widest text-center">
        Standard URL Input
      </h4>
      <div class="p-8 border rounded-xl bg-background shadow-xl space-y-4 h-full flex flex-col justify-center">
        <label class="text-sm font-medium text-foreground block mb-2 tracking-tight">Enter your domain</label>
        <InputURL
          v-model="url1"
          hint="Don't type the protocol, only the pathname."
          placeholder="mysite.com"
          protocol="https://"
        />

        <div class="pt-6 border-t mt-4 flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          Full URL: <span class="text-primary text-base font-bold tracking-normal">{{ url1 || '--' }}</span>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h4 class="text-xs font-bold uppercase text-muted-foreground mb-6 tracking-widest text-center">
        Custom Protocol & Disabled
      </h4>
      <div class="p-8 border rounded-xl bg-background shadow-xl space-y-4 h-full flex flex-col justify-center">
        <label class="text-sm font-medium text-foreground block mb-2 tracking-tight">Disabled with Custom Protocol</label>
        <InputURL
          v-model="url2"
          hint="This field is read-only."
          protocol="ftps://"
          :disabled="true"
        />
        <p class="text-[10px] text-muted-foreground italic tracking-tight">
          Useful for displaying configuration or restricted settings.
        </p>
      </div>
    </div>
  </div>
</template>
