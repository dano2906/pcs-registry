<script setup>
import { AnimatePresence, LayoutGroup, motion } from 'motion-v'
import { computed, ref } from 'vue'

// Component Props
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  activeFilters: {
    type: Array,
    default: undefined,
  },
  theme: {
    type: String,
    default: 'dark',
  },
})

// Emits for two-way binding and change events
const emit = defineEmits(['update:activeFilters', 'filterChange'])

// Internal State (used when activeFilters is uncontrolled)
const internalActiveFilters = ref(
  props.items.length > 0 ? [props.items[0]?.id || '', props.items[1]?.id || ''].filter(Boolean) : [],
)

// Computed Active Filters (prioritizes controlled prop over internal state)
const currentActiveFilters = computed(() => {
  return props.activeFilters !== undefined ? props.activeFilters : internalActiveFilters.value
})

const isDark = computed(() => props.theme === 'dark')

// Handlers
function toggleFilter(id) {
  let newFilters
  if (currentActiveFilters.value.includes(id)) {
    newFilters = currentActiveFilters.value.filter(i => i !== id)
  }
  else {
    newFilters = [...currentActiveFilters.value, id]
  }

  // Only update internal state if we aren't controlling from the parent
  if (props.activeFilters === undefined) {
    internalActiveFilters.value = newFilters
  }

  emit('update:activeFilters', newFilters)
  emit('filterChange', newFilters)
}

function clearFilters() {
  if (props.activeFilters === undefined) {
    internalActiveFilters.value = []
  }
  emit('update:activeFilters', [])
  emit('filterChange', [])
}

// Mapped Lists
const selectedFiltersMap = computed(() =>
  currentActiveFilters.value.map(id => props.items.find(f => f.id === id)).filter(Boolean),
)

const availableFiltersMap = computed(() =>
  props.items.filter(f => !currentActiveFilters.value.includes(f.id)),
)
</script>

<template>
  <div class="w-full max-w-sm mx-auto font-inter">
    <LayoutGroup>
      <motion.div
        layout
        :transition="{ layout: { type: 'tween', duration: 0.20, ease: 'easeOut' } }"
        class="flex flex-wrap gap-2 mb-6 min-h-[32px]"
      >
        <motion.button
          v-for="filter in selectedFiltersMap"
          :key="filter.id"
          :layout-id="`filter-${filter.id}`"
          class="relative flex items-center justify-center gap-1.5 px-3 py-1.5 text-[13px] font-medium border border-dotted rounded-full cursor-pointer transition-colors outline-none focus-visible:ring-2 focus-visible:ring-zinc-700" :class="[
            filter.color,
          ]"
          :transition="{ layout: { type: 'spring', stiffness: 400, damping: 28, mass: 0.8 } }"
          @click="toggleFilter(filter.id)"
        >
          <span class="relative z-10">{{ filter.label }}</span>

          <motion.span
            :initial="{ width: 0, opacity: 0 }"
            :animate="{ width: 'auto', opacity: 1 }"
            :exit="{ width: 0, opacity: 0 }"
            class="flex items-center overflow-hidden"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              class="opacity-70 hover:opacity-100 ml-1.5 shrink-0"
            >
              <path
                d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </motion.span>
        </motion.button>
      </motion.div>

      <motion.div
        layout
        :transition="{ layout: { type: 'tween', duration: 0.20, ease: 'easeOut' } }"
        class="rounded-xl border p-5 min-h-40 overflow-hidden shadow-2xl flex flex-col" :class="[
          isDark
            ? 'bg-zinc-950 border-zinc-800 shadow-black/50'
            : 'bg-zinc-50 border-zinc-200 shadow-black/5',
        ]"
      >
        <div class="flex justify-between items-center mb-4">
          <motion.h3 layout class="text-sm font-medium" :class="[isDark ? 'text-zinc-100' : 'text-zinc-900']">
            Select filter
          </motion.h3>
          <div class="flex items-center gap-2">
            <AnimatePresence>
              <motion.button
                v-if="selectedFiltersMap.length > 0"
                layout
                :initial="{ opacity: 0, scale: 0.9 }"
                :animate="{ opacity: 1, scale: 1 }"
                :exit="{ opacity: 0, scale: 0.9 }"
                class="text-xs text-zinc-500 cursor-pointer hover:text-zinc-300 transition-colors"
                @click="clearFilters"
              >
                Clear
              </motion.button>
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          layout
          :transition="{ layout: { type: 'tween', duration: 0.20, ease: 'easeOut' } }"
          class="flex flex-wrap gap-2 flex-1 relative content-start"
        >
          <motion.button
            v-for="filter in availableFiltersMap"
            :key="filter.id"
            :layout-id="`filter-${filter.id}`"
            class="relative flex items-center justify-center gap-1.5 px-3 py-1.5 text-[13px] font-medium border border-dotted rounded-full cursor-pointer transition-colors outline-none focus-visible:ring-2 focus-visible:ring-zinc-700" :class="[
              filter.color,
            ]"
            :transition="{ layout: { type: 'spring', stiffness: 400, damping: 28, mass: 0.8 } }"
            @click="toggleFilter(filter.id)"
          >
            <span class="relative z-10">{{ filter.label }}</span>
          </motion.button>

          <div
            v-if="availableFiltersMap.length === 0"
            class="absolute inset-0 flex items-center justify-center text-sm font-medium select-none pointer-events-none" :class="[
              isDark ? 'text-zinc-600/50' : 'text-zinc-400',
            ]"
          >
            im empty pls fill me up :(
          </div>
        </motion.div>
      </motion.div>
    </LayoutGroup>
  </div>
</template>
