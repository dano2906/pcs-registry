<script lang="ts" setup>
import AsyncMultiSelect from '@/registry/async-multi-select/AsyncMultiSelect.vue'
import AsyncSelectSimple from '@/registry/async-multi-select/AsyncSelectSimple.vue'

const selectedAsyncValues = ref([])
const selectedAsyncValues2 = ref([])
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
    <AsyncMultiSelect v-model="selectedAsyncValues" url="https://dummyjson.com/products" source-key="products" k="id" v="title" class="w-full max-w-xs" />
    <AsyncMultiSelect v-model="selectedAsyncValues2" url="https://jsonplaceholder.typicode.com/todos" k="id" v="title" class="w-full max-w-xs" />
    <AsyncSelectSimple url="https://jsonplaceholder.typicode.com/todos" value-key="id" label-key="title" />
  </div>
</template>
