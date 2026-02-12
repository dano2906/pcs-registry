import type { StandardSchemaV1 } from '@standard-schema/spec'
import { computed, ref, watch } from 'vue'

interface FormOptions<T extends StandardSchemaV1> {
  initialValues: StandardSchemaV1.InferInput<T>
  validateOn?: 'change' | 'submit' | 'manual'
}

export function useForm<T extends StandardSchemaV1>(
  schema: T,
  options: FormOptions<T>,
) {
  type FormInput = StandardSchemaV1.InferInput<T>

  // Estado principal
  const fields = ref<FormInput>({ ...options.initialValues })
  const errors = ref<Record<string, string>>({})
  const isSubmitting = ref(false)
  const isDirty = ref(false)

  // Determinar si el formulario es válido (si no hay llaves en el objeto de errores)
  const isValid = computed(() => Object.keys(errors.value).length === 0)

  /**
   * Ejecuta la validación del Standard Schema
   */
  async function validate() {
    const result = await schema['~standard'].validate(fields)

    if (result.issues) {
      errors.value = result.issues.reduce((acc, issue) => {
        const path = issue.path?.map(p => (typeof p === 'object' ? p.key : p)).join('.') || 'root'
        acc[path] = issue.message
        return acc
      }, {} as Record<string, string>)
      return { success: false, errors: errors.value }
    }

    errors.value = {}
    return { success: true, data: result.value }
  }

  /**
   * Crea un "model" (ref) vinculado a una propiedad del objeto fields.
   * Útil para usar con v-model en el template.
   */
  function defineField(path: keyof FormInput) {
    return computed({
      get: () => fields[path],
      set: (val) => {
        fields[path] = val
        isDirty.value = true
      },
    })
  }

  // Lógica de validación automática por cambio
  if (options.validateOn === 'change') {
    watch(fields, () => validate(), { deep: true })
  }

  return {
    fields,
    errors,
    isValid,
    isDirty,
    isSubmitting,
    validate,
    defineField,
  }
}
