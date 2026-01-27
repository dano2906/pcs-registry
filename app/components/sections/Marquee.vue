<script setup lang="ts">
// Datos de ejemplo
const items = [
  { text: 'Dano UI', url: 'https://dano-ui.com' },
  { text: 'GitHub', url: 'https://github.com' },
  { text: 'Vue.js', url: 'https://vuejs.org' },
  { text: 'TypeScript', url: 'https://www.typescriptlang.org' },
  { text: 'Vite', url: 'https://vitejs.dev' },
]
</script>

<template>
  <PartialsSection
    id="#marquee" component-name="marquee"
    description="Componente de carrusel de desplazamiento horizontal infinito." title="Marquee"
  >
    <template #example>
      <div class="mt-8 space-y-4">
        <div class="overflow-hidden w-full">
          <!-- Option 1: Custom slots -->
          <Marquee :items="items" :speed="20" :repeats="3" direction="normal">
            <template #default="{ item }">
              <div class="flex flex-col gap-2">
                <h3 class="font-semibold text-lg">
                  {{ item.text }}
                </h3>
                <a
                  :href="item.url" target="_blank"
                  class="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {{ item.url }}
                </a>
              </div>
            </template>
          </Marquee>
        </div>

        <!-- Second row with opposite direction -->
        <div class="overflow-hidden w-full">
          <Marquee :items="items" :speed="20" :repeats="3" direction="reverse">
            <template #default="{ item }">
              <div class="flex flex-col gap-2">
                <h3 class="font-semibold text-lg">
                  {{ item.text }}
                </h3>
                <a
                  :href="item.url" target="_blank"
                  class="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {{ item.url }}
                </a>
              </div>
            </template>
          </Marquee>
        </div>

        <!-- Option 2: Without slot (default rendering) -->
        <!-- <Marquee
                        :items="items"
                        :speed="20"
                        :repeats="3"
                        hover-color="red-500"
                    /> -->
      </div>
    </template>
  </PartialsSection>
</template>
