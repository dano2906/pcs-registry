import type { StandardSchemaV1 } from '@standard-schema/spec'
import type { AcceptType } from '../file-input/file-input'
import type { useForm } from './useForm'

interface InputText {
  name: string
  label: string
  type: 'text'
  placeholder: string
}

interface Textarea {
  name: string
  label: string
  type: 'textarea'
  placeholder: string
}

interface InputPassword {
  name: string
  label: string
  type: 'password'
  placeholder: string
}

interface InputEmail {
  name: string
  label: string
  type: 'email'
  placeholder: string
}

interface Select {
  name: string
  label: string
  type: 'select'
  options: string[]
  placeholder: string
}

interface AsyncSelect {
  name: string
  label: string
  type: 'async-select'
  url: string
  sourceKey: string
  k: string | number
  v: string | number
  config?: {
    emptyMessage: string
    emptySearchMessage: string
    searchPlaceholder: string
  }
}

interface Checkbox {
  name: string
  label: string
  type: 'checkbox'
  checked?: boolean
}

interface NumberField {
  name: string
  label: string
  type: 'number-field'
  min?: number
  max?: number
  default?: number
}

interface Numeric {
  name: string
  label: string
  type: 'numeric'
  min?: number
  max?: number
  step?: number
}

interface Currency {
  name: string
  label: string
  type: 'currency'
  lang: Intl.UnicodeBCP47LocaleIdentifier
  config?: {
    placeholder?: string
    searchPlaceholder?: string
    emptyState?: string
  }
}

interface TelInput {
  name: string
  label: string
  type: 'tel'
  placeholder?: string
}
interface FileInput {
  name: string
  label: string
  type: 'file'
  maxSize?: number
  accept?: AcceptType[]
  multiple?: boolean
}

export type FormContext<T extends StandardSchemaV1 = any> = ReturnType<typeof useForm<T>>

export type Field = InputText | Textarea | InputPassword | InputEmail | Select | AsyncSelect | Checkbox | NumberField | Numeric | Currency | TelInput | FileInput

export interface FormBuilderProps {
  fields: Field[]
  errors?: Record<string, string>
}
