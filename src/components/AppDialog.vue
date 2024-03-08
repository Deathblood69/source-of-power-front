<script setup lang="ts">
  interface Props {
    modelValue: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
  })
</script>

<template>
  <VDialog
    max-width="500"
    :model-value="modelValue"
  >
    <template v-slot:default="{isActive}">
      <VCard title="Dialog">
        <VCardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </VCardText>

        <VCardActions>
          <VSpacer />
          <VBtn
            text="Close Dialog"
            @click="isActive.value = false"
          ></VBtn>
        </VCardActions>
      </VCard>
    </template>
  </VDialog>
</template>
