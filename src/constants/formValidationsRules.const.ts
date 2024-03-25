/**
 * Liste des règles de validation du formulaire
 */
export const FORM_VALIDATIONS_RULES = {
  required: (v: string) => !!v || 'Ce champ est requis !',
}
