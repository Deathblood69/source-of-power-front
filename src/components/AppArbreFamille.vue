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

  const familyTree = ref<FamilyTree | null>()

  const nodes = ref<Object[]>([])

  /**  COMPUTED   **/

  /**  LIFECYCLE  **/

  onMounted(() => {
    const element = document.getElementById('tree')
    if (element) {
      familyTree.value = new FamilyTree(element, {
        mode: themeStore.theme,
        nodeBinding: {
          field_0: 'nom',
          field_1: 'prenom',
        },
      })
      loadFamilyTree()
    }
  })

  watchEffect(() => {
    loadFamilyTree()
  })

  function loadFamilyTree() {
    nodes.value = famille.value

    const element = document.getElementById('tree')
    // Vérifier si le graphe a déjà été initialisé
    if (!familyTree.value && element) {
      // Créer le graphe avec les nouveaux nœuds
      familyTree.value = new FamilyTree(element, {
        nodes: nodes.value,
        nodeBinding: {
          field_0: 'nom',
          field_1: 'prenom',
        },
      })
    } else {
      // Mettre à jour le graphe avec les nouveaux nœuds
      familyTree.value?.load(nodes.value)
    }
  }

  /**  METHODS  **/
</script>

<template>
  <div
    id="tree"
    style="width: 100%; height: 700px"
  />
</template>

<style scoped></style>
