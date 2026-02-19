import type { StandardSchemaV1 } from '@standard-schema/spec'
import type { AcceptType } from '../file-input/file-input'
import type { useForm } from './useForm'

interface CommonConfig {
  wrapperClass?: string
  description?: string
  disabled?: boolean
  orientation: 'horizontal' | 'vertical'
  name: string
  label: string
}

// 1. Inputs básicos que solo añaden type y placeholder
interface InputText extends CommonConfig {
  type: 'text'
  placeholder: string
}

interface InputPassword extends CommonConfig {
  type: 'password'
  placeholder: string
}

interface InputEmail extends CommonConfig {
  type: 'email'
  placeholder: string
}

interface TelInput extends CommonConfig {
  type: 'tel'
  placeholder?: string
}

// 2. Componentes de texto largo o selección
interface Textarea extends CommonConfig {
  type: 'textarea'
  placeholder: string
}

interface Select extends CommonConfig {
  type: 'select'
  options: string[]
  placeholder: string
}

interface AsyncSelect extends CommonConfig {
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

// 3. Componentes numéricos y financieros
interface NumberField extends CommonConfig {
  type: 'number-field'
  min?: number
  max?: number
  default?: number
}

interface Numeric extends CommonConfig {
  type: 'numeric'
  min?: number
  max?: number
  step?: number
}

interface Currency extends CommonConfig {
  type: 'currency'
  lang: Intl.UnicodeBCP47LocaleIdentifier
  config?: {
    placeholder?: string
    searchPlaceholder?: string
    emptyState?: string
  }
}

// 4. Casos especiales (Restricción de orientación o archivos)
interface Checkbox extends Omit<CommonConfig, 'orientation'> {
  type: 'checkbox'
  orientation: 'horizontal'
  checked?: boolean
}

interface FileInput extends CommonConfig {
  type: 'file'
  maxSize?: number
  accept?: AcceptType[]
  multiple?: boolean
}

interface Switch extends CommonConfig {
  type: 'switch'
  orientation: 'horizontal'
  checked?: boolean
}

interface Slider extends CommonConfig {
  type: 'slider'
  stepTicks?: boolean
  min?: number
  max?: number
  step?: number
  defaultValue?: number
}

export type Field
  = | InputText
    | Textarea
    | InputPassword
    | InputEmail
    | Select
    | AsyncSelect
    | Checkbox
    | NumberField
    | Numeric
    | Currency
    | TelInput
    | FileInput
    | Switch
    | Slider

export interface FormBuilderProps {
  fields: Field[]
  errors?: Record<string, string>
}

export type FormContext<T extends StandardSchemaV1 = any> = ReturnType<typeof useForm<T>>
