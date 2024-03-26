<script setup lang="ts">
  import FamilyTree from '@balkangraph/familytree.js'
  import type {FamilleDto} from '~/domains/famille/dto/famille.dto'
  import type {PropType} from 'vue'

  /**  CONFIG  **/

  const themeStore = useThemeStore()

  /**  PROPS  **/

  const famille = defineModel({
    required: true,
    type: Object as PropType<FamilleDto[]>,
  })

  /**  EMITS  **/

  /**  REFS  **/

  const familyTree = ref<FamilyTree>()

  /**  COMPUTED   **/

  /**  LIFECYCLE  **/

  onMounted(() => {
    console.log(famille.value)
    const element = document.getElementById('tree') ?? ''
    familyTree.value = new FamilyTree(element, {
      mode: themeStore.theme,
      nodeBinding: {
        field_0: 'nom',
        field_1: 'prenom',
      },
    })
  })

  watch(famille.value, () => {
    if (familyTree.value && famille.value) {
      familyTree.value?.load(famille.value)
    }
  })

  /**  METHODS  **/
</script>

<template>
  <div
    id="tree"
    style="width: 100%; height: 700px"
  />
</template>

<style scoped></style>
