<script setup lang="ts">
import type { Contribuitor } from '~~/shared/types/app'
import { RefreshCcw } from 'lucide-vue-next'

const { data, status, error, refresh } = await useFetch<Contribuitor[]>('https://api.github.com/repos/dano2906/pcs-registry/contributors')

function getFallback(username: string) {
  const first = username.at(0)?.toUpperCase() ?? 'O'
  const last = username.at(-1)?.toUpperCase() ?? 'P'
  return first + last
}
</script>

<template>
  <div class="w-auto flex items-center justify-center group mt-8">
    <template v-if="status === 'success' && data">
      <NuxtLink
        v-for="contribuitor in data" :key="contribuitor.id" :to="contribuitor.html_url" external target="_blank" class="shadow-md rounded-full size-14 -ml-3 ease-out group-hover:grayscale-100 hover:grayscale-0 hover:opacity-100 hover:scale-120 hover:z-10 transition"
      >
        <Avatar class="size-full">
          <AvatarImage :src="contribuitor.avatar_url" />
          <AvatarFallback>{{ getFallback(contribuitor.login) }}</AvatarFallback>
        </Avatar>
      </NuxtLink>
    </template>
    <template v-if="status === 'pending' && !error">
      <span class="text-muted-foreground tracking-wide font-normal text-lg">Loading your people...</span>
    </template>
    <template v-if="status === 'error' || error">
      <Button variant="ghost" size="icon-lg" class="text-primary" @click="refresh">
        <Spinner v-if="status === 'pending'" />
        <RefreshCcw v-else />
      </Button>
    </template>
  </div>
</template>
