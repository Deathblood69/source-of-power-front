<script setup lang="ts">
import {API} from '~/constants/api.const'
import type {FamilleDto} from '~/domains/famille/dto/famille.dto'
import type {PaginedQuery} from '~/types/paginedQuery'
import FamilyTree from '@balkangraph/familytree.js'
import type {MembreFamille} from '~/domains/famille/entities/membreFamille'
import {TypeRelation} from '~/domains/relation/enum/typeRelation.enum'

/**  PROPS  **/

const themeStore = useThemeStore()

const {data: response} = useFetchService<PaginedQuery<FamilleDto>>(API.famille)

/**  EMITS  **/

/**  REFS  **/

const familyTreeRef = ref<FamilyTree>()

/**  COMPUTED   **/

const personnages = computed(() => {
  return response.value?.data
      .flatMap((e) => e.personnages)
      .map((personnage) => {
        const familyMember: MembreFamille = {
          ...personnage,
          pids: [],
          fid: '',
          mid: '',
          divorced: [],
        }
        personnage.relations.forEach((relation) => {
          if (relation.type === TypeRelation.MARIAGE) {
            familyMember.pids.push(relation.relatedPersonnage.id)
          } else if (relation.type === TypeRelation.PARENT) {
            console.log('couple', relation.relatedPersonnage)
          }
        })
        // { id: 1, pids: [2], name: "Amber McKenzie", gender: "female" },
        // { id: 2, pids: [1], name: "Ava Field", gender: "male" },
        // { id: 3, mid: 1, fid: 2, name: "Peter Stevens", gender: "male" }
        //
        return familyMember
      })
})

/**  LIFECYCLE  **/

onMounted(() => {
  const element = document.getElementById('tree')
  if (element) {
    familyTreeRef.value = new FamilyTree(element, {
      mode: themeStore.theme,
      enableSearch: false,
      nodeBinding: {
        field_0: 'prenom',
        field_1: 'nom',
      },
      nodes: [],
    })
  }
})

watch([personnages, familyTreeRef], () => {
  if (personnages.value && familyTreeRef.value) {
    familyTreeRef.value?.load(personnages.value)
  }
})

/**  METHODS  **/
</script>

<template>
  <VContainer fluid>
    <div id="tree"/>
  </VContainer>
</template>

