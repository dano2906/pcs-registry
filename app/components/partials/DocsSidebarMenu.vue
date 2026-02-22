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

const links = [{
  label: 'Action Button',
  href: '/docs/components/action-button',
}, {
  label: 'Async Multi Select',
  href: '/docs/components/async-multi-select',
}, {
  label: 'Auth Modal',
  href: '/docs/components/auth-modal',
}, {
  label: 'Blury Text',
  href: '/docs/components/blury-text',
}, {
  label: 'Currency Selector',
  href: '/docs/components/currency-selector',
}, {
  label: 'Date Picker',
  href: '/docs/components/date-picker',
}, {
  label: 'File Input',
  href: '/docs/components/file-input',
}, {
  label: 'Form Builder',
  href: '/docs/components/form-builder',
}, {
  label: 'Hyper Text',
  href: '/docs/components/hyper-text',
}, {
  label: 'Input Password',
  href: '/docs/components/input-password',
}, {
  label: 'Input URL',
  href: '/docs/components/input-url',
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
  label: 'Pricing Card',
  href: '/docs/components/pricing-card',
}, {
  label: 'Slider Range',
  href: '/docs/components/slider-range',
}, {
  label: 'Spotlight Card',
  href: '/docs/components/spotlight-card',
}, {
  label: 'Tel input',
  href: '/docs/components/tel-input',
}, {
  label: 'Timeline',
  href: '/docs/components/timeline',
}, {
  label: 'Typography',
  href: '/docs/components/typography',
}]

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
  links,
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
  links,
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
