<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

async function actionError() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { ok: false, message: 'Something went wrong' }
}

async function actionSuccess() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { ok: true }
}
</script>

<template>
  <div class="flex flex-wrap items-center justify-start gap-x-2">
    <ActionButton :action="actionError" require-are-you-sure>
      <template #text>
        Ventana con error
      </template>
      <template #icon>
        <Plus />
      </template>
    </ActionButton>
    <ActionButton :action="actionSuccess" require-are-you-sure>
      <template #text>
        Ventana sin error
      </template>
      <template #icon>
        <Plus />
      </template>
    </ActionButton>
    <ActionButton :action="actionError">
      <template #text>
        Sin ventana y con error
      </template>
      <template #icon>
        <Plus />
      </template>
    </ActionButton>
    <ActionButton :action="actionSuccess">
      <template #text>
        Sin ventana y con error
      </template>
      <template #icon>
        <Plus />
      </template>
    </ActionButton>
    <ActionButton :action="actionSuccess">
      <template #icon>
        <Plus />
      </template>
    </ActionButton>
  </div>
</template>
