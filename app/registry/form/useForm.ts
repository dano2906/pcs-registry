import type { StandardSchemaV1 } from '@standard-schema/spec'
import { computed, onMounted, ref, watch } from 'vue'

interface FormOptions<T extends StandardSchemaV1> {
  name?: string
  initialValues: Partial<StandardSchemaV1.InferInput<T>>
  validateOn?: 'change' | 'submit'
  validateOnMount?: boolean
  onSubmit?: (data: StandardSchemaV1.InferOutput<T>) => void | Promise<void>
}

export function useForm<T extends StandardSchemaV1>(
  schema: T,
  options: FormOptions<T>,
) {
  type FormInput = StandardSchemaV1.InferInput<T>
  const name = options.name
  const fields = ref<FormInput>(structuredClone(options.initialValues))
  const errors = ref<Record<string, string>>({})
  const isSubmitting = ref(false)
  const isDirty = ref(false)

  const isValid = computed(() => Object.keys(errors.value).length === 0)

  async function validate() {
    const result = await schema['~standard'].validate(fields.value)

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

  async function handleSubmit(e?: Event) {
    if (e)
      e.preventDefault()

    isSubmitting.value = true

    try {
      const result = await validate()
      if (result.success && options.onSubmit) {
        await options.onSubmit(result.data)
      }
    }
    finally {
      isSubmitting.value = false
    }
  }

  function defineField(path: keyof FormInput) {
    return computed({
      get: () => fields.value[path],
      set: (val) => {
        fields.value[path] = val
        isDirty.value = true
      },
    })
  }

  if (options.validateOn === 'change') {
    watch(fields, () => validate(), { deep: true })
  }

  onMounted(() => {
    if (options.validateOnMount !== false) {
      validate()
    }
  })

  return {
    name,
    fields,
    errors,
    isValid,
    isDirty,
    isSubmitting,
    validate,
    handleSubmit,
    defineField,
  }
}
