<script setup lang="ts">
import type { CountryCode } from 'libphonenumber-js'
import { onClickOutside } from '@vueuse/core'
import { AsYouType, getCountries, getCountryCallingCode } from 'libphonenumber-js'
import { computed, ref, shallowRef, useTemplateRef, watch } from 'vue'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'

interface Country {
  id: CountryCode
  name: string | undefined
  code: string
  flag: CountryCode
}

const props = withDefaults(defineProps<{
  placeholder?: string
  disabled?: boolean
}>(), {
  placeholder: 'Número de teléfono',
  disabled: false,
})

const model = defineModel<string>()

const target = useTemplateRef('target')
const phone = ref('')
const open = ref(false)
const search = ref('')

const specialCountryCodes: string[] = [
  'SX',
  'BQ',
  'BV',
  'GF',
  'GP',
  'HM',
  'IO',
  'PM',
  'RE',
  'SJ',
  'UM',
  'XK',
  'AH',
  'NY',
  'AK',
  'AC',
]

// Use shallowRef for performance with large lists
const allCountries = shallowRef<Country[]>([])

// Initialize countries once
const regionNames = new Intl.DisplayNames(['es'], { type: 'region' })
allCountries.value = getCountries()
  .map(code => ({
    id: code,
    name: regionNames.of(code),
    code: `+${getCountryCallingCode(code)}`,
    flag: code,
  }))
  .sort((a, b) => (a.name || '').localeCompare(b.name || ''))

const selectedCountry = ref(allCountries.value.find(c => c.id === 'CU') || allCountries.value[0])

const filteredCountries = computed(() => {
  const term = search.value.toLowerCase()
  if (!term)
    return allCountries.value
  return allCountries.value.filter(c =>
    c.name?.toLowerCase().includes(term)
    || c.id.toLowerCase().includes(term)
    || c.code.includes(term),
  )
})

onClickOutside(target, (_event) => {
  open.value = false
  search.value = ''
})

function onInput(e: string | number) {
  const input = e.toString()
  if (selectedCountry.value && selectedCountry.value.id) {
    const formatter = new AsYouType(selectedCountry.value.id)
    phone.value = formatter.input(input)
    model.value = formatter.getNumber()?.formatInternational() ?? undefined
  }
}

function selectCountry(c: Country) {
  selectedCountry.value = c
  open.value = false
  search.value = ''
  if (phone.value) {
    onInput(phone.value)
  }
}

// Sync model with phone display if needed
watch(model, (newVal) => {
  if (newVal && newVal !== phone.value) {
    // Logic to handle external model updates could go here
  }
}, { immediate: true })
</script>

<template>
  <div ref="target" class="relative w-full">
    <!-- Input Group: h-9 (36px) -->
    <div class="flex h-9 w-full items-center rounded-md border border-input bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring">
      <Button
        type="button"
        variant="ghost"
        class="flex h-full items-center gap-1 rounded-l-md rounded-r-none border-r border-input px-3 py-0 hover:bg-accent hover:text-accent-foreground"
        :disabled="disabled"
        @click="open = !open"
      >
        <img
          v-if="!specialCountryCodes.includes(selectedCountry?.flag)"
          class="aspect-square w-4 object-contain"
          :src="`https://flagsapi.com/${selectedCountry?.flag}/flat/64.png`"
          loading="lazy"
          alt="Flag"
        >
        <span v-else class="w-4 h-3 bg-foreground/20" />

        <span class="text-xs font-medium text-muted-foreground">{{ selectedCountry?.code }}</span>
        <svg class="h-3 w-3 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Button>

      <Input
        type="tel"
        inputmode="numeric"
        :placeholder="props.placeholder"
        :value="phone"
        :disabled="props.disabled"
        class="flex-1 border-0 bg-transparent px-3 py-1 text-sm shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 h-full"
        @update:model-value="onInput"
      />
    </div>

    <div
      v-if="open"
      class="absolute top-full left-0 z-50 mt-1 w-[300px] rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
    >
      <div class="p-2">
        <Input
          v-model="search"
          placeholder="Buscar país..."
          class="h-8 text-xs"
          autofocus
        />
      </div>

      <div class="max-h-64 overflow-y-auto p-1">
        <Button
          v-for="c in filteredCountries"
          :key="c.id"
          variant="ghost"
          class="w-full justify-start gap-2 px-2 py-1.5 text-sm font-normal h-auto"
          @click="selectCountry(c)"
        >
          <img
            v-if="!specialCountryCodes.includes(c.flag)"
            :src="`https://flagsapi.com/${c.flag}/flat/64.png`"
            class="aspect-square w-4 object-contain"
            loading="lazy"
            alt="Flag"
          >
          <span v-else class="w-4 h-3 bg-foreground/20" />
          <span class="flex-1 truncate text-left">{{ c.name }}</span>
          <span class="text-xs text-muted-foreground">{{ c.code }}</span>
          <span v-if="c.id === selectedCountry?.id" class="ml-auto flex h-4 w-4 items-center justify-center">
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </span>
        </Button>
        <div v-if="filteredCountries.length === 0" class="py-6 text-center text-sm text-muted-foreground">
          No se encontraron países.
        </div>
      </div>
    </div>
  </div>
</template>
