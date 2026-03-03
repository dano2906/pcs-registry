<script setup lang="ts">
import AuthModal from '@/registry/auth-modal/AuthModal.vue'

function onLoginProvider(provider: string) {
  console.warn('Login with provider:', provider)
}

function onSubmit(data: any) {
  console.warn('Form submitted:', data)
}
</script>

<template>
  <div class="flex items-center justify-center p-8 bg-muted/50 rounded-lg border border-dashed">
    <AuthModal @login-provider="onLoginProvider" @submit="onSubmit" />
  </div>
</template>
