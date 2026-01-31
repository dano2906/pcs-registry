<script setup lang="ts">
definePageMeta({
  name: 'component-content-page',
})

const { params } = useRoute('component-page')
</script>

<template>
  <div>
    {{ params }}
  </div>
</template>
