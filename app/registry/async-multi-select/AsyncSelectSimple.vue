<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  url: string
  sourceKey?: string
  valueKey: string
  labelKey: string
  placeholder?: string
  empty?: string
}

const { url, sourceKey, valueKey, labelKey, placeholder = 'Select an option', empty = 'No options found' } = defineProps<Props>()

const selectedValue = defineModel<string>()

const options = ref<any[]>([])
const isLoading = ref(false)
const errorMessage = ref('')

async function fetchData() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch(url)
    if (!response.ok)
      throw new Error(`Error: ${response.status}`)

    const data = await response.json()
    if (sourceKey && data[sourceKey]) {
      options.value = data[sourceKey]
    }
    else {
      options.value = data
    }
  }
  catch (error) {
    console.error('Failed to fetch select options:', error)
    errorMessage.value = 'Failed to load options'
  }
  finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <Select v-model="selectedValue" :disabled="isLoading || !!errorMessage">
    <SelectTrigger class="w-full">
      <SelectValue :placeholder="isLoading ? 'Loading...' : (errorMessage || placeholder)" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup v-if="options.length > 0">
        <SelectItem
          v-for="item in options"
          :key="item[valueKey]"
          :value="String(item[valueKey])"
        >
          {{ item[labelKey] }}
        </SelectItem>
      </SelectGroup>
      <div v-else-if="!isLoading" class="p-2 text-sm text-gray-500 text-center">
        {{ empty }}
      </div>
    </SelectContent>
  </Select>
</template>
