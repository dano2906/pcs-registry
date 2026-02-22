import type { StandardSchemaV1 } from '@standard-schema/spec'
import { computed, onMounted, ref } from 'vue'

// Utilidad simple para debounce
function useDebounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

function get(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj)
}

// Utilidad para setear valor en objetos anidados (inmutable-ish para Vue)
function set(obj: any, path: string, value: any) {
  const keys = path.split('.')
  const lastKey = keys.pop()!
  const target = keys.reduce((acc, key) => acc[key] = acc[key] || {}, obj)
  target[lastKey] = value
  return { ...obj }
}

interface FormOptions<T extends StandardSchemaV1> {
  name?: string
  initialValues: Partial<StandardSchemaV1.InferInput<T>>
  mode?: 'change' | 'blur' | 'submit'
  validateOnMount?: boolean
  debounce?: number
  onSubmit?: (data: StandardSchemaV1.InferOutput<T>) => void | Promise<void>
}

export function useForm<T extends StandardSchemaV1>(
  schema: T,
  options: FormOptions<T>,
) {
  type FormInput = StandardSchemaV1.InferInput<T>
  type FormOutput = StandardSchemaV1.InferOutput<T>

  const fields = ref<FormInput>(structuredClone(options.initialValues) as FormInput)
  const errors = ref<Record<string, string>>({})
  const touched = ref<Record<string, boolean>>({})
  const dirtyFields = ref<Record<string, boolean>>({})
  const isSubmitting = ref(false)

  const isDirty = computed(() => Object.keys(dirtyFields.value).length > 0)
  const isValid = computed(() => Object.keys(errors.value).length === 0)

  const validateSchema = async () => {
    const result = await schema['~standard'].validate(fields.value)

    if (result.issues) {
      const newErrors: Record<string, string> = {}
      for (const issue of result.issues) {
        const path = issue.path?.map(p => (typeof p === 'object' ? p.key : p)).join('.') || 'root'
        if (!newErrors[path]) {
          newErrors[path] = issue.message
        }
      }
      errors.value = newErrors
      return { success: false, issues: result.issues }
    }

    errors.value = {}
    return { success: true, data: result.value }
  }

  const validateFieldRaw = async (path: string) => {
    const result = await schema['~standard'].validate(fields.value)

    if (result.issues) {
      const issue = result.issues.find((i) => {
        const p = i.path?.map(k => (typeof k === 'object' ? k.key : k)).join('.')
        return p === path
      })

      if (issue)
        errors.value[path] = issue.message
      else delete errors.value[path]
    }
    else {
      delete errors.value[path]
    }
  }

  const debouncedValidateField = useDebounce(validateFieldRaw, options.debounce ?? 200)

  const setFieldValue = (path: string, value: any) => {
    set(fields.value, path, value)
    dirtyFields.value[path] = true
    if (options.mode === 'change') {
      debouncedValidateField(path)
    }
    else if (options.mode === 'blur' && touched.value[path]) {
      debouncedValidateField(path)
    }
  }

  const setFieldTouched = (path: string, isTouched = true) => {
    touched.value[path] = isTouched
    if (isTouched && options.mode === 'blur') {
      validateFieldRaw(path)
    }
  }

  const setError = (path: string, message: string) => {
    errors.value[path] = message
  }

  const reset = (newValues?: Partial<FormInput>) => {
    fields.value = structuredClone(newValues || options.initialValues) as FormInput
    errors.value = {}
    dirtyFields.value = {}
    touched.value = {}
    isSubmitting.value = false
  }

  const touchAllFields = () => {
    const allTouched: Record<string, boolean> = {}
    // Recorremos las llaves actuales de fields
    Object.keys(fields.value).forEach((key) => {
      allTouched[key] = true
    })
    touched.value = allTouched
  }

  const handleSubmit = async (e?: Event) => {
    if (e)
      e.preventDefault()
    isSubmitting.value = true
    try {
      const result = await validateSchema()

      if (!result.success) {
        touchAllFields()
        return
      }

      if (options.onSubmit) {
        await options.onSubmit(result.data as FormOutput)
      }
    }
    finally {
      isSubmitting.value = false
    }
  }

  function defineField(path: string) {
    const value = computed({
      get: () => get(fields.value, path),
      set: val => setFieldValue(path, val),
    })

    const binding = {
      'onBlur': () => setFieldTouched(path, true),
      'aria-invalid': computed(() => !!errors.value[path]),
    }

    return [value, binding] as const
  }

  onMounted(() => {
    if (options.validateOnMount) {
      validateSchema()
    }
  })

  return {
    name: options.name,
    fields,
    errors,
    touched,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    validate: validateSchema,
    reset,
    handleSubmit,
    defineField,
    setFieldValue,
    setFieldTouched,
    setError,
    validateField: debouncedValidateField,
  }
}
