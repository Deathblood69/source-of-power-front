<script setup lang="ts">
  interface Props {
    title?: string
    modelValue: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    title: '',
    modelValue: false,
  })
</script>

<template>
  <VDialog
    max-width="500"
    :model-value="modelValue"
    :persistent="true"
  >
    <VCard :title="title">
      <VCardText>
        <slot />
      </VCardText>
    </VCard>
  </VDialog>
</template>
