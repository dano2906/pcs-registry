<script setup lang="ts">
import InputPassword from '@/registry/input-password/InputPassword.vue'

const password = ref('')
const disabledPassword = ref('My Secret Password')
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-muted/20 rounded-lg border max-w-2xl mx-auto">
    <div class="space-y-4">
      <h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
        Default Input
      </h4>
      <div class="space-y-2">
        <label class="text-xs font-bold text-muted-foreground uppercase tracking-widest block">Password</label>
        <InputPassword v-model="password" placeholder="Enter your password..." />
      </div>
      <div class="pt-4 border-t text-sm text-muted-foreground">
        Current value: <span class="font-mono text-foreground">{{ password || '(empty)' }}</span>
      </div>
    </div>

    <div class="space-y-4 border-t md:border-t-0 md:border-l pt-8 md:pt-0 md:pl-8">
      <h4 class="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
        Disabled State
      </h4>
      <div class="space-y-2">
        <label class="text-xs font-bold text-muted-foreground uppercase tracking-widest block">Read-only Password</label>
        <InputPassword v-model="disabledPassword" :disabled="true" />
      </div>
    </div>
  </div>
</template>
