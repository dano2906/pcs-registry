<script setup lang="ts">
import Timeline from '@/registry/timeline/Timeline.vue'

const timelineItems = [
  {
    date: 'December 20th, 2025',
    title: 'Lanzamiento del proyecto',
    badge: 'Nuevo',
    description: 'Iniciamos oficialmente el desarrollo del nuevo sistema con el equipo completo. Primera reunión de planificación y definición de objetivos.',
    link: {
      text: 'Ver detalles',
      url: '#',
    },
  },
  {
    date: 'August 15th, 2025',
    title: 'Primer prototipo funcional',
    description: 'Completamos la primera versión funcional del sistema con las características básicas implementadas y probadas por el equipo.',
  },
  {
    date: 'March 5th, 2025',
    title: 'Fase de diseño completada',
    description: 'Se finalizó toda la documentación de diseño, wireframes y mockups aprobados por todos los stakeholders del proyecto.',
  },
  {
    date: 'November 10th, 2024',
    title: 'Inicio del proyecto',
    description: 'Primera reunión con el cliente para definir el alcance del proyecto y establecer los requerimientos iniciales.',
  },
]

const registryDependencies = [
  { text: 'button' },
  { text: 'badge' },
]

const dependencies = [
  { text: 'lucide-vue-next', url: 'https://lucide.dev/' },
]
</script>

<template>
  <PartialsSection
    id="timeline"
    component-name="timeline"
    description="Un componente para mostrar eventos en orden cronológico."
    title="Timeline"
    :registry-dependencies
    :dependencies
  >
    <template #example>
      <div class="flex items-start justify-center w-full max-w-2xl">
        <Timeline :items="timelineItems" />
      </div>
    </template>
  </PartialsSection>
</template>
