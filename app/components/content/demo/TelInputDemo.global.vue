<script setup lang="ts">
import TelInput from '@/registry/tel-input/TelInput.vue'

const phone1 = ref('')
const phone2 = ref('+1234567890')
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-12 p-12 bg-muted/20 rounded-xl border max-w-4xl mx-auto overflow-hidden">
    <div class="space-y-4">
      <h4 class="text-xs font-bold uppercase text-muted-foreground mb-6 tracking-widest text-center">
        Standard Input
      </h4>
      <div class="p-8 border rounded-xl bg-background shadow-xl space-y-4">
        <label class="text-sm font-medium text-foreground block mb-2">Phone Number</label>
        <TelInput v-model="phone1" placeholder="Type your number..." />

        <div class="pt-6 border-t mt-4 flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
          International Format: <span class="text-primary text-base font-bold tracking-normal">{{ phone1 || '--' }}</span>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h4 class="text-xs font-bold uppercase text-muted-foreground mb-6 tracking-widest text-center text-center">
        Disabled State
      </h4>
      <div class="p-8 border rounded-xl bg-background shadow-xl space-y-4">
        <label class="text-sm font-medium text-foreground block mb-2 opacity-50">Read-only Number</label>
        <TelInput v-model="phone2" :disabled="true" />
        <p class="text-[10px] text-muted-foreground italic tracking-tight">
          User cannot change the selected country or the number.
        </p>
      </div>
    </div>
  </div>
</template>
