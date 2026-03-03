<script setup lang="ts">
import FilterSelection from '@/registry/filter-selection/FilterSelection.vue'

const activeFilters = ref(['1', '3'])
const filters = [
  { id: '1', label: 'Vue.js', color: 'text-emerald-500 border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10' },
  { id: '2', label: 'Nuxt', color: 'text-green-400 border-green-400/20 bg-green-400/5 hover:bg-green-400/10' },
  { id: '3', label: 'TypeScript', color: 'text-blue-500 border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10' },
  { id: '4', label: 'Tailwind', color: 'text-sky-400 border-sky-400/20 bg-sky-400/5 hover:bg-sky-400/10' },
  { id: '5', label: 'Motion', color: 'text-purple-500 border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10' },
]
</script>

<template>
  <div class="flex flex-col items-center justify-center p-12 bg-muted/10 rounded-xl border gap-8 max-w-2xl mx-auto overflow-hidden">
    <div class="w-full space-y-4">
      <h4 class="text-xs font-bold uppercase text-muted-foreground mb-8 tracking-widest text-center">
        Interactive Filter Selection
      </h4>

      <div class="w-full bg-zinc-900 rounded-2xl p-8 border border-zinc-800 shadow-2xl">
        <FilterSelection
          v-model:active-filters="activeFilters"
          :items="filters"
          theme="dark"
        />

        <div class="pt-8 border-t border-zinc-800 mt-8 flex flex-wrap gap-2 items-center">
          <span class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block w-full mb-1">Active IDs:</span>
          <span
            v-for="id in activeFilters"
            :key="id"
            class="px-2 py-0.5 bg-zinc-800 text-zinc-300 text-[10px] font-mono rounded border border-zinc-700"
          >
            {{ id }}
          </span>
          <span v-if="activeFilters.length === 0" class="text-xs text-zinc-600 italic tracking-tight">No active filters.</span>
        </div>
      </div>
    </div>
  </div>
</template>
