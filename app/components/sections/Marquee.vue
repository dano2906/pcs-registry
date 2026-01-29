<script setup lang="ts">
// Datos de ejemplo
const items = [
  { text: 'Dano UI', url: 'https://dano-ui.com' },
  { text: 'GitHub', url: 'https://github.com' },
  { text: 'Vue.js', url: 'https://vuejs.org' },
  { text: 'TypeScript', url: 'https://www.typescriptlang.org' },
  { text: 'Vite', url: 'https://vitejs.dev' },
]

const testimonialItems = [
  {
    name: 'Ana García',
    comment: 'Increíble componente! Me ha ahorrado horas de desarrollo. La animación es suave y funciona perfectamente en todos los navegadores.',
    rate: 5,
    url: 'https://dano-ui.com',
    source: 'dano-ui.com',
  },
  {
    name: 'Carlos Ruiz',
    comment: 'Exactamente lo que necesitaba para mi proyecto. Fácil de implementar y muy customizable. 10/10',
    rate: 4,
    source: 'GitHub',
  },
  {
    name: 'María López',
    comment: 'La mejor librería de componentes Vue que he usado. La documentación es clara y los ejemplos son muy útiles.',
    rate: 5,
    url: 'https://vuejs.org',
    source: 'Vue Community',
  },
  {
    name: 'Juan Pérez',
    comment: 'Rendimiento excelente incluso con muchos items. Me encanta que pause al hacer hover, muy intuitivo.',
    rate: 3,
    url: 'https://www.typescriptlang.org',
    source: 'TypeScript Forum',
  },
  {
    name: 'Laura Martín',
    comment: 'Simplemente perfecto. Lo integré en producción y funciona de maravilla. Muy recomendado!',
    rate: 5,
    url: 'https://vitejs.dev',
    source: 'Vite Community',
  },
]
</script>

<template>
  <PartialsSection
    id="#marquee"
    component-name="marquee"
    description="Componente de carrusel de desplazamiento horizontal infinito."
    title="Marquee"
  >
    <template #example>
      <h2>Horizontal Marquee</h2>
      <div class="mt-8 space-y-4">
        <div class="overflow-hidden w-full mb-0">
          <!-- Option 1: Custom slots -->
          <Marquee
            :items="items"
            :speed="15"
            :repeats="3"
            direction="normal"
          >
            <template #default="{ item }">
              <div class="flex flex-col gap-2">
                <h3 class="font-semibold text-lg">
                  {{ item.text }}
                </h3>
                <a
                  :href="item.url"
                  target="_blank"
                  class="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {{ item.url }}
                </a>
              </div>
            </template>
          </Marquee>
        </div>

        <!-- Second row with opposite direction -->
        <div class="overflow-hidden w-full mt-0">
          <Marquee
            :items="items"
            :speed="15"
            :repeats="3"
            direction="reverse"
          >
            <template #default="{ item }">
              <div class="flex flex-col gap-2">
                <h3 class="font-semibold text-lg">
                  {{ item.text }}
                </h3>
                <a
                  :href="item.url"
                  target="_blank"
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

      <h2>Vertical Marquee</h2>
      <div class="mt-8 flex gap-4">
        <div class="overflow-hidden h-90 flex-1">
          <Marquee
            :items="testimonialItems"
            :speed="20"
            :repeats="3"
            direction="normal"
            orientation="vertical"
          >
            <template #default="{ item }">
              <div class="flex flex-col gap-3">
                <!-- User -->
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {{ item.name?.charAt(0).toUpperCase() || 'U' }}
                  </div>
                  <div>
                    <h3 class="font-semibold text-sm">
                      {{ item.name }}
                    </h3>
                    <div class="flex gap-1">
                      <span v-for="star in item.rate" :key="star" class="text-yellow-500 text-xs">★</span>
                    </div>
                  </div>
                </div>

                <!-- Comment -->
                <p class="text-sm text-foreground line-clamp-3">
                  {{ item.comment }}
                </p>

                <!-- Link/Source -->
                <a
                  :href="item.url"
                  target="_blank"
                  class="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {{ item.source || 'Ver más' }}
                </a>
              </div>
            </template>
          </Marquee>
        </div>
        <!-- second one -->
        <div class="overflow-hidden h-90 flex-1">
          <Marquee
            :items="testimonialItems"
            :speed="20"
            :repeats="3"
            direction="reverse"
            orientation="vertical"
          >
            <template #default="{ item }">
              <div class="flex flex-col gap-3">
                <!-- User -->
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {{ item.name?.charAt(0).toUpperCase() || 'U' }}
                  </div>
                  <div>
                    <h3 class="font-semibold text-sm">
                      {{ item.name }}
                    </h3>
                    <div class="flex gap-1">
                      <span v-for="star in item.rate" :key="star" class="text-yellow-500 text-xs">★</span>
                    </div>
                  </div>
                </div>

                <!-- Comment -->
                <p class="text-sm text-foreground line-clamp-3">
                  {{ item.comment }}
                </p>

                <!-- Link/Source -->
                <a
                  :href="item.url"
                  target="_blank"
                  class="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {{ item.source || 'Ver más' }}
                </a>
              </div>
            </template>
          </Marquee>
        </div>
      </div>
    </template>
  </PartialsSection>
</template>
