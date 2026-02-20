<script setup lang="ts">
definePageMeta({
  layout: 'default',
  name: 'index',
  scrollToTop: true,
})
</script>

<template>
  <main class="w-full py-4 px-2 space-y-14">
    <SectionsAuthModal />
    <SectionsForm />
    <!-- <SectionsBluryText />
    <SectionsHyperText />
    <SectionsCurrencySelector />
    <SectionsTypography />
    <SectionsActionButton />
    <SectionsInputPassword />
    <SectionsLoadingSwap />
    <SectionsNumberInput />
    <SectionsMultiSelect />
    <SectionsTelInput />
    <SectionsFileInput />
    <SectionsTimeline />
    <SectionsMarquee />
    <SectionsPricingCard /> -->
  </main>
</template>
