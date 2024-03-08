<script setup lang="ts">
  import {API} from '~/constants/api.const'
  import type {FamilleDto} from '~/domains/famille/dto/famille.dto'
  import type {PaginedQuery} from '~/types/paginedQuery'
  import FamilyTree from '@balkangraph/familytree.js'
  import {MembreFamille} from '~/domains/relation/dto/membreFamille'
  import {TypeRelation} from '~/domains/relation/enum/typeRelation.enum'
  import {Genre} from '~/domains/personnage/enum/genre.enum'

  /**  PROPS  **/

  const themeStore = useThemeStore()

  const {data: response} = useFetchService<PaginedQuery<FamilleDto>>(
    API.famille,
  )

  /**  EMITS  **/

  /**  REFS  **/

  const dialogPersonnage = ref<boolean>(false)

  const familyTreeRef = ref<FamilyTree>()

  /**  COMPUTED   **/

  const personnages = computed(() => {
    console.log(response.value?.data)
    return response.value?.data
      .flatMap((e) => e.membres)
      .map((personnage) => {
        const membreFamille = new MembreFamille(personnage, [], '', '', [])
        personnage.relations.forEach((relation) => {
          const {id, genre} = relation.relatedPersonnage
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

  watch([personnages, familyTreeRef], () => {
    if (personnages.value && familyTreeRef.value) {
      familyTreeRef.value?.load(personnages.value)
    }
  })

  /**  METHODS  **/
  function toggleDialog() {
    dialogPersonnage.value = !dialogPersonnage.value
  }
</script>

<template>
  <VContainer fluid>
    <div id="tree" />
    <AppDialog :model-value="dialogPersonnage">
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
    </AppDialog>
  </VContainer>
</template>
