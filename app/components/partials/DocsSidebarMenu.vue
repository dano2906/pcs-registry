<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { components } from '@/lib/constants'

const groupsEN = [{
  label: 'Sections',
  links: [{
    label: 'Home',
    href: '/',
    highlight: false,
  }, {
    label: 'Overview',
    href: '/docs/overview',
    highlight: false,
  }, {
    label: 'Components',
    href: '/docs/components',
    highlight: false,
  }, {
    label: 'Contributing',
    href: '/docs/contributing',
    highlight: false,
  }],
}, {
  label: 'Components',
  links: components,
}]

const groupsES = [{
  label: 'Secciones',
  links: [{
    label: 'Inicio',
    href: '/',
    highlight: false,
  }, {
    label: 'Descripción general',
    href: '/docs/overview',
    highlight: false,
  }, {
    label: 'Componentes',
    href: '/docs/components',
    highlight: false,
  }, {
    label: 'Contribuciones',
    href: '/docs/contributing',
    highlight: false,
  }],
}, {
  label: 'Componentes',
  links: components,
}]

const { locale } = useI18n()

const menuItems = computed(() => {
  switch (locale.value) {
    case 'en':
      return groupsEN
    case 'es':
      return groupsES
    default:
      return groupsEN
  }
})
</script>

<template>
  <Sidebar>
    <SidebarContent class="p-3 no-scrollbar">
      <SidebarGroup v-for="(group, index) in menuItems" :key="index">
        <SidebarGroupLabel class="text-xs text-muted-foreground">
          {{ group.label }}
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="link in group.links" :key="link.href">
              <SidebarMenuButton as-child>
                <NuxtLink :to="link.href" class="text-sm text-foreground">
                  {{ link.label }}
                  <div v-if="link.highlight" class="size-2 rounded-full animate-pulse bg-primary" />
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
