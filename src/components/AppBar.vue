<script lang="ts" setup>
  import type {ToolbarButton} from '~/types/toolbarButton'

  type Emits = {
    menu: []
  }

  const emit = defineEmits<Emits>()

  interface Props {
    items: ToolbarButton[]
    titre?: string
  }

  defineProps<Props>()
</script>

<template>
  <VAppBar :elevation="2">
    <VAppBarNavIcon
      icon="mdi-menu"
      @click="emit('menu')"
    />
    <VAppBarTitle :text="titre" />
    <slot />
    <VBtn
      v-for="item in items"
      :key="item.icon"
      :icon="item.icon"
      @click="item.action"
    />
  </VAppBar>
</template>
