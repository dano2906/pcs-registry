<script setup lang="ts">
import DatePicker from '@/registry/date-picker/DatePicker.vue'

const date = ref('2024-03-03')
</script>

<template>
  <div class="flex flex-col items-center justify-center p-12 bg-muted/20 rounded-xl border gap-8 max-w-xl mx-auto overflow-hidden">
    <div class="w-full space-y-4">
      <h4 class="text-xs font-bold uppercase text-muted-foreground mb-4 tracking-widest text-center">
        Calendar Selection
      </h4>

      <div class="flex flex-col items-center gap-6 p-10 border rounded-xl bg-background shadow-xl">
        <DatePicker v-model="date" placeholder="Pick a date" />

        <div class="pt-6 border-t mt-4 flex justify-between items-center text-xs font-bold text-muted-foreground uppercase tracking-widest w-full">
          Selected Date: <span class="text-primary text-base font-bold tracking-normal">{{ date || '--' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
