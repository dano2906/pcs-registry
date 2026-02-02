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
  }, {
    label: 'Changelog',
    href: '/docs/changelog',
  }],
}, {
  label: 'Components',
  links: [{
    label: 'Action Button',
    href: '/docs/components/action-button',
  }, {
    label: 'Async Multi Select',
    href: '/docs/components/async-multi-select',
  }, {
    label: 'Currency Selector',
    href: '/docs/components/currency-selector',
  }, {
    label: 'File Input',
    href: '/docs/components/file-input',
  }, {
    label: 'Input Password',
    href: '/docs/components/input-password',
  }, {
    label: 'Loading Swap',
    href: '/docs/components/loading-swap',
  }, {
    label: 'Marquee',
    href: '/docs/components/marquee',
  }, {
    label: 'Multi Select',
    href: '/docs/components/multi-select',
  }, {
    label: 'Number Input',
    href: '/docs/components/number-input',
  }, {
    label: 'Tel input',
    href: '/docs/components/tel-input',
  }, {
    label: 'Timeline',
    href: '/docs/components/timeline',
  }, {
    label: 'Typography',
    href: '/docs/components/typography',
  }],
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
  }, {
    label: 'Registro de cambios',
    href: '/docs/changelog',
  }],
}, {
  label: 'Componentes',
  links: [{
    label: 'Action Button',
    href: '/docs/components/action-button',
  }, {
    label: 'Async Multi Select',
    href: '/docs/components/async-multi-select',
  }, {
    label: 'Currency Selector',
    href: '/docs/components/currency-selector',
  }, {
    label: 'File Input',
    href: '/docs/components/file-input',
  }, {
    label: 'Input Password',
    href: '/docs/components/input-password',
  }, {
    label: 'Loading Swap',
    href: '/docs/components/loading-swap',
  }, {
    label: 'Marquee',
    href: '/docs/components/marquee',
  }, {
    label: 'Multi Select',
    href: '/docs/components/multi-select',
  }, {
    label: 'Number Input',
    href: '/docs/components/number-input',
  }, {
    label: 'Tel input',
    href: '/docs/components/tel-input',
  }, {
    label: 'Timeline',
    href: '/docs/components/timeline',
  }, {
    label: 'Typography',
    href: '/docs/components/typography',
  }],
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
    <SidebarContent class="p-3">
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
