<script setup lang="ts">
import type { FormBuilderProps, FormContext } from './types'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import AsyncSelectSimple from '../async-multi-select/AsyncSelectSimple.vue'
import CurrencySelector from '../currency-selector/CurrencySelector.vue'
import InputPassword from '../input-password/InputPassword.vue'
import NumberInput from '../number-input/NumberInput.vue'
import TelInput from '../tel-input/TelInput.vue'

const { fields, form, formClass } = defineProps<{
  fields: FormBuilderProps['fields']
  form: FormContext
  formClass?: string
}>()

const getValue = (name: string) => form.fields.value[name]
const getError = (name: string) => form.errors.value[name]

function handleChange(name: string, value: any) {
  form.setFieldValue(name, value)
}

function handleBlur(name: string) {
  form.setFieldTouched(name, true)
}
</script>

<template>
  <form :class="[formClass]" @submit="form.handleSubmit">
    <div v-for="field in fields" :key="field.name" :class="field.wrapperClass">
      <Field :orientation="field.orientation">
        <FieldLabel
          :for="field.name"
          :class="{ 'text-red-500': getError(field.name) }"
        >
          {{ field.label }}
        </FieldLabel>

        <Select
          v-if="field.type === 'select'"
          :id="field.name"
          :model-value="getValue(field.name)"
          @update:model-value="(val) => handleChange(field.name, val)"
        >
          <SelectTrigger class="w-full" @blur="handleBlur(field.name)">
            <SelectValue :placeholder="field.placeholder" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="opt in field.options"
                :key="opt"
                :value="opt.toLowerCase()"
              >
                {{ opt }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <AsyncSelectSimple
          v-else-if="field.type === 'async-select'"
          :id="field.name"
          class="w-full"
          :model-value="getValue(field.name)"
          :url="field.url"
          :source-key="field.sourceKey"
          :value-key="String(field.k)"
          :label-key="String(field.v)"
          @update:model-value="(val) => handleChange(field.name, val)"
        />

        <Input
          v-else-if="field.type === 'text' || field.type === 'email'"
          :id="field.name"
          :type="field.type"
          :model-value="getValue(field.name)"
          :placeholder="field.placeholder"
          @update:model-value="(val) => handleChange(field.name, val)"
          @blur="handleBlur(field.name)"
        />

        <InputPassword
          v-else-if="field.type === 'password'"
          :id="field.name"
          :model-value="getValue(field.name)"
          :placeholder="field.placeholder"
          @update:model-value="(val) => handleChange(field.name, val)"
          @blur="handleBlur(field.name)"
        />

        <Textarea
          v-else-if="field.type === 'textarea'"
          :id="field.name"
          :type="field.type"
          :model-value="getValue(field.name)"
          :placeholder="field.placeholder"
          class="resize-none"
          @update:model-value="(val) => handleChange(field.name, val)"
          @blur="handleBlur(field.name)"
        />

        <Checkbox
          v-else-if="field.type === 'checkbox'"
          :id="field.name"
          :model-value="getValue(field.name)"
          @update:model-value="(val) => handleChange(field.name, val)"
          @blur="handleBlur(field.name)"
        />

        <NumberField
          v-if="field.type === 'number-field'" :id="field.name" :min="field.min" :max="field.max" :model-value="getValue(field.name)"
          :default-value="field.default || field.min || undefined" class="w-full"
          @update:model-value="(val) => handleChange(field.name, val)" @blur="handleBlur(field.name)"
        >
          <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>

        <NumberInput
          v-else-if="field.type === 'numeric'"
          :id="field.name"
          :step="field.step || 1"
          :min="field.min"
          :max="field.max"
          :model-value="getValue(field.name)"
          @update:model-value="(val) => handleChange(field.name, val)"
          @blur="handleBlur(field.name)"
        />

        <CurrencySelector
          v-else-if="field.type === 'currency'"
          :id="field.name"
          :model-value="getValue(field.name)"
          :lang="field.lang"
          :config="field.config"
          @update:model-value="(val) => handleChange(field.name, val)"
          @blur="handleBlur(field.name)"
        />

        <TelInput
          v-else-if="field.type === 'tel'"
          :id="field.name"
          :placeholder="field.placeholder"
          :name="field.name"
          :model-value="getValue(field.name)"
          @update:model-value="(val) => handleChange(field.name, val)"
          @blur="handleBlur(field.name)"
        />

        <FileInput
          v-else-if="field.type === 'file'"
          :id="field.name"
          :name="field.name"
          :model-value="getValue(field.name)"
          :accept="field.accept"
          :multiple="field.multiple"
          :max-size="field.maxSize"
          @update:model-value="(val) => handleChange(field.name, val)"
          @blur="handleBlur(field.name)"
        />

        <FieldDescription v-if="field.description">
          {{ field.description }}
        </FieldDescription>

        <FieldError v-if="getError(field.name)" class="text-sm text-red-500 font-medium">
          {{ getError(field.name) }}
        </FieldError>
      </Field>
    </div>
    <div class="col-span-full w-full flex items-center justify-end gap-2">
      <slot name="actions" />
      <Button type="submit" :disabled="form.isSubmitting.value">
        <LoadingSwap :is-loading="form.isSubmitting.value">
          Guardar
        </LoadingSwap>
      </Button>
    </div>
  </form>
</template>
