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
  }, {
    label: 'Overview',
    href: '/docs/overview',
  }, {
    label: 'Components',
    href: '/docs/components',
  }, {
    label: 'Contributing',
    href: '/docs/contributing',
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
  }, {
    label: 'Descripción general',
    href: '/docs/overview',
  }, {
    label: 'Componentes',
    href: '/docs/components',
  }, {
    label: 'Contribuciones',
    href: '/docs/contributing',
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
