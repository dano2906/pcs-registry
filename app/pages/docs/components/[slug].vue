<script setup lang="ts">
definePageMeta({
  layout: 'default',
  name: 'component-content-page',
})

const { params } = useRoute('component-page')
</script>

<template>
  <div>
    {{ params }}
  </div>
</template>
