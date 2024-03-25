<script setup lang="ts">
  import {API} from '~/constants/api.const'
  import type {FamilleDto} from '~/domains/famille/dto/famille.dto'
  import type {PaginedQuery} from '~/types/paginedQuery'
  import FamilyTree from '@balkangraph/familytree.js'
  import {MembreFamille} from '~/domains/relation/dto/membreFamille'
  import {TypeRelation} from '~/domains/relation/enum/typeRelation.enum'
  import {Genre} from '~/domains/personne/enum/genre.enum'
  import type {RelationDto} from '~/domains/relation/dto/relation.dto'

  /**  PROPS  **/

  const themeStore = useThemeStore()

  const {data: response} = useFetchService<PaginedQuery<FamilleDto>>(
    API.famille,
  )

  /**  EMITS  **/

  /**  REFS  **/

  const dialogPersonne = ref<boolean>(false)

  const familyTreeRef = ref<FamilyTree>()

  /**  COMPUTED   **/

  const personnes = computed(() => {
    console.log(response.value?.data)
    return response.value?.data
      .flatMap((e) => e.membres)
      .map((personne) => {
        const membreFamille = new MembreFamille(personne, [], '', '', [])
        personne.relations.forEach((relation: RelationDto) => {
          const {id, genre} = relation.relatedPersonne
          switch (relation.type) {
            case TypeRelation.MARIAGE:
              membreFamille.pids.push(id)
              break
            case TypeRelation.DIVORCE:
              membreFamille.pids.push(id)
              membreFamille.divorced.push(id)
              break
            case TypeRelation.ENFANT:
              switch (genre) {
                case Genre.HOMME:
                  membreFamille.fid = id
                  break
                case Genre.FEMME:
                  membreFamille.mid = id
                  break
              }
              break
          }
        })
        return membreFamille
      })
  })

  /**  LIFECYCLE  **/

  onMounted(() => {
    const element = document.getElementById('tree')
    if (element) {
      familyTreeRef.value = new FamilyTree(element, {
        mode: themeStore.theme,
        nodeBinding: {
          field_0: 'prenom',
          field_1: 'nom',
        },
      })
    }
  })

  watch([personnes, familyTreeRef], () => {
    if (personnes.value && familyTreeRef.value) {
      familyTreeRef.value?.load(personnes.value)
    }
  })

  /**  METHODS  **/
  function toggleDialog() {
    dialogPersonne.value = !dialogPersonne.value
  }
</script>

<template>
  <VContainer fluid>
    <div id="tree" />
  </VContainer>
</template>
