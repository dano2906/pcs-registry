<script lang="ts" setup>
import AuthModal from '~/registry/auth-modal/AuthModal.vue'

function onLoginProvider(provider: string) {
  console.warn('logged with', provider)
}

function onSubmit(form: any) {
  console.warn('submitted', form)
}
</script>

<template>
  <PartialsSection id="blury-text" component-name="blury-text" description="Componente de texto con animaciones de blur." title="Blury Text" :registry-dependencies="[]">
    <template #example>
      <div class="flex flex-col flex-wrap items-start justify-start gap-2">
        <AuthModal @login-provider="onLoginProvider" @submit="onSubmit" />
      </div>
    </template>
  </PartialsSection>
</template>
