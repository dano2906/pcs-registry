<script setup lang="ts">
import type { FormBuilderProps, FormContext } from './types'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import AsyncSelectSimple from '../async-multi-select/AsyncSelectSimple.vue'
import CurrencySelector from '../currency-selector/CurrencySelector.vue'
import DatePicker from '../date-picker/DatePicker.vue'
import FileInput from '../file-input/FileInput.vue'
import InputPassword from '../input-password/InputPassword.vue'
import InputURL from '../input-url/InputURL.vue'
import LoadingSwap from '../loading-swap/LoadingSwap.vue'
import NumberInput from '../number-input/NumberInput.vue'
import SliderRange from '../slider-range/SliderRange.vue'
import TelInput from '../tel-input/TelInput.vue'

defineOptions({
  name: 'FormBuilder',
})

const { fields, form, formClass, isNested } = defineProps<{
  fields: FormBuilderProps['fields']
  form: FormContext
  formClass?: string
  isNested?: boolean
}>()

defineSlots<Record<string, (props: any) => any>>()

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
  <form v-if="!isNested" :class="[formClass]" @submit="form.handleSubmit">
    <template v-for="field in fields" :key="field.name">
      <div v-if="field.type === 'fieldset'" :class="cn('col-span-full border border-border p-4 rounded-lg', field.wrapperClass)">
        <FieldLegend v-if="field.label">
          {{ field.label }}
        </FieldLegend>
        <FormBuilder :fields="field.fields" :form="form" is-nested :form-class="formClass">
          <template v-for="(_, name) in $slots" :key="name" #[name]="slotProps">
            <slot :name="name" v-bind="slotProps" />
          </template>
        </FormBuilder>
      </div>
      <div v-else :class="field.wrapperClass">
        <Field :orientation="field.orientation">
          <template v-if="field.type === 'custom'">
            <slot :name="field.slotName" :field="field" :form="form" />
          </template>
          <template v-else>
            <div v-if="field.type === 'checkbox' || field.type === 'switch'" class="flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <Checkbox
                  v-if="field.type === 'checkbox'"
                  :id="field.name"
                  :disabled="field.disabled"
                  :model-value="getValue(field.name)"
                  @update:model-value="(val) => handleChange(field.name, val)"
                  @blur="handleBlur(field.name)"
                />
                <Switch
                  v-else
                  :id="field.name"
                  :disabled="field.disabled"
                  :model-value="getValue(field.name)"
                  @update:model-value="(val) => handleChange(field.name, val)"
                  @blur="handleBlur(field.name)"
                />
                <FieldLabel
                  v-if="field.label"
                  :for="field.name"
                  :class="{ 'text-red-500': getError(field.name) }"
                  class="mb-0"
                >
                  {{ field.label }}
                </FieldLabel>
              </div>
              <FieldDescription v-if="field.description">
                {{ field.description }}
              </FieldDescription>
              <FieldError v-if="getError(field.name)" class="text-sm text-red-500 font-medium">
                {{ getError(field.name) }}
              </FieldError>
            </div>
            <template v-else>
              <FieldLabel
                v-if="field.label"
                :for="field.name"
                :class="{ 'text-red-500': getError(field.name) }"
              >
                {{ field.label }}
              </FieldLabel>

              <Select
                v-if="field.type === 'select'"
                :id="field.name"
                :model-value="getValue(field.name)"
                :disabled="field.disabled"
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
                :disabled="field.disabled"
                @update:model-value="(val) => handleChange(field.name, val)"
              />

              <Input
                v-else-if="field.type === 'text' || field.type === 'email'"
                :id="field.name"
                :type="field.type"
                :disabled="field.disabled"
                :model-value="getValue(field.name)"
                :placeholder="field.placeholder"
                @update:model-value="(val) => handleChange(field.name, val)"
                @blur="handleBlur(field.name)"
              />

              <InputPassword
                v-else-if="field.type === 'password'"
                :id="field.name"
                :disabled="field.disabled"
                :model-value="getValue(field.name)"
                :placeholder="field.placeholder"
                @update:model-value="(val) => handleChange(field.name, val)"
                @blur="handleBlur(field.name)"
              />

              <Textarea
                v-else-if="field.type === 'textarea'"
                :id="field.name"
                :type="field.type"
                :disabled="field.disabled"
                :model-value="getValue(field.name)"
                :placeholder="field.placeholder"
                class="resize-none"
                @update:model-value="(val) => handleChange(field.name, val)"
                @blur="handleBlur(field.name)"
              />

              <RadioGroup
                v-else-if="field.type === 'radio-group'"
                :id="field.name"
                :disabled="field.disabled"
                :model-value="getValue(field.name)"
                @update:model-value="(val) => handleChange(field.name, val)"
                @blur="handleBlur(field.name)"
              >
                <div v-for="opt in field.options" :key="opt.value" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`${field.name}-${opt.value}`" :value="opt.value" />
                  <Label :for="`${field.name}-${opt.value}`" class="font-medium">{{ opt.title }}</Label>
                  <Label :for="`${field.name}-${opt.value}`" class="font-normal">{{ opt.subtitle }}</Label>
                </div>
              </RadioGroup>

              <DatePicker
                v-else-if="field.type === 'date'"
                :id="field.name"
                :disabled="field.disabled"
                :model-value="getValue(field.name)"
                :placeholder="field.placeholder"
                @update:model-value="(val) => handleChange(field.name, val)"
                @blur="handleBlur(field.name)"
              />

              <NumberField
                v-else-if="field.type === 'number-field'"
                :id="field.name"
                :min="field.min"
                :max="field.max"
                :model-value="getValue(field.name)"
                :default-value="field.default || field.min || undefined"
                class="w-full"
                :disabled="field.disabled"
                @update:model-value="(val) => handleChange(field.name, val)"
                @blur="handleBlur(field.name)"
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
                :disabled="field.disabled"
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
                :disabled="field.disabled"
                @update:model-value="(val) => handleChange(field.name, val)"
                @blur="handleBlur(field.name)"
              />

              <TelInput
                v-else-if="field.type === 'tel'"
                :id="field.name"
                :placeholder="field.placeholder"
                :name="field.name"
                :disabled="field.disabled"
                :model-value="getValue(field.name)"
                @update:model-value="(val) => handleChange(field.name, val)"
                @blur="handleBlur(field.name)"
              />

              <InputURL
                v-else-if="field.type === 'url'"
                :id="field.name"
                :placeholder="field.placeholder"
                :name="field.name"
                :disabled="field.disabled"
                :model-value="getValue(field.name)"
                :hint="field.hint"
                @update:model-value="(val) => handleChange(field.name, val)"
                @blur="handleBlur(field.name)"
              />

              <SliderRange
                v-else-if="field.type === 'slider'"
                :id="field.name"
                :min="field.min"
                :max="field.max"
                :step="field.step"
                :model-value="getValue(field.name)"
                :step-ticks="field.stepTicks"
                @update:model-value="(val) => handleChange(field.name, val)"
                @blur="handleBlur(field.name)"
              />

              <FileInput
                v-else-if="field.type === 'file'"
                :id="field.name"
                :name="field.name"
                :disabled="field.disabled"
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
            </template>
          </template>
        </Field>
      </div>
    </template>
    <div class="col-span-full w-full flex items-center justify-end gap-2">
      <slot name="actions" />
      <Button type="submit" :disabled="form.isSubmitting.value">
        <LoadingSwap :is-loading="form.isSubmitting.value">
          Guardar
        </LoadingSwap>
      </Button>
    </div>
  </form>
  <div v-else :class="[formClass]">
    <template v-for="field in fields" :key="field.name">
      <div v-if="field.type === 'fieldset'" :class="cn('col-span-full border border-border p-4 rounded-lg', field.wrapperClass)">
        <FieldLegend v-if="field.label">
          {{ field.label }}
        </FieldLegend>
        <FormBuilder :fields="field.fields" :form="form" is-nested :form-class="formClass">
          <template v-for="(_, name) in $slots" :key="name" #[name]="slotProps">
            <slot :name="name" v-bind="slotProps" />
          </template>
        </FormBuilder>
      </div>
      <div v-else :class="field.wrapperClass">
        <Field :orientation="field.orientation">
          <template v-if="field.type === 'custom'">
            <slot :name="field.slotName" :field="field" :form="form" />
          </template>
          <template v-else>
            <div v-if="field.type === 'checkbox' || field.type === 'switch'" class="flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <Checkbox
                  v-if="field.type === 'checkbox'"
                  :id="field.name"
                  :disabled="field.disabled"
                  :model-value="getValue(field.name)"
                  @update:model-value="(val) => handleChange(field.name, val)"
                  @blur="handleBlur(field.name)"
                />
                <Switch
                  v-else
                  :id="field.name"
                  :disabled="field.disabled"
                  :model-value="getValue(field.name)"
                  @update:model-value="(val) => handleChange(field.name, val)"
                  @blur="handleBlur(field.name)"
                />
                <FieldLabel
                  v-if="field.label"
                  :for="field.name"
                  :class="{ 'text-red-500': getError(field.name) }"
                  class="mb-0"
                >
                  {{ field.label }}
                </FieldLabel>
              </div>
              <FieldDescription v-if="field.description">
                {{ field.description }}
              </FieldDescription>
              <FieldError v-if="getError(field.name)" class="text-sm text-red-500 font-medium">
                {{ getError(field.name) }}
              </FieldError>
            </div>
            <template v-else>
              <FieldLabel
                v-if="field.label"
                :for="field.name"
                :class="{ 'text-red-500': getError(field.name) }"
              >
                {{ field.label }}
              </FieldLabel>

              <Select
                v-if="field.type === 'select'"
                :id="field.name"
                :model-value="getValue(field.name)"
                :disabled="field.disabled"
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
                :disabled="field.disabled"
                @update:model-value="(val) => handleChange(field.name, val)"
              />

              <Input
                v-else-if="field.type === 'text' || field.type === 'email'"
                :id="field.name"
                :type="field.type"
                :disabled="field.disabled"
                :model-value="getValue(field.name)"
                :placeholder="field.placeholder"
                @update:model-value="(val) => handleChange(field.name, val)"
                @blur="handleBlur(field.name)"
              />

              <InputPassword
                v-else-if="field.type === 'password'"
                :id="field.name"
                :disabled="field.disabled"
                :model-value="getValue(field.name)"
                :placeholder="field.placeholder"
                @update:model-value="(val) => handleChange(field.name, val)"
                @blur="handleBlur(field.name)"
              />

              <Textarea
                v-else-if="field.type === 'textarea'"
                :id="field.name"
                :type="field.type"
                :disabled="field.disabled"
                :model-value="getValue(field.name)"
                :placeholder="field.placeholder"
                class="resize-none"
                @update:model-value="(val) => handleChange(field.name, val)"
                @blur="handleBlur(field.name)"
              />

              <RadioGroup
                v-else-if="field.type === 'radio-group'"
                :id="field.name"
                :disabled="field.disabled"
                :model-value="getValue(field.name)"
                @update:model-value="(val) => handleChange(field.name, val)"
                @blur="handleBlur(field.name)"
              >
                <div v-for="opt in field.options" :key="opt.value" class="flex items-center space-x-2">
                  <RadioGroupItem :id="`${field.name}-${opt.value}`" :value="opt.value" />
                  <Label :for="`${field.name}-${opt.value}`" class="font-medium">{{ opt.title }}</Label>
                  <Label v-if="opt.subtitle" :for="`${field.name}-${opt.value}`" class="font-normal">{{ opt.subtitle }}</Label>
                </div>
              </RadioGroup>

              <DatePicker
                v-else-if="field.type === 'date'"
                :id="field.name"
                :disabled="field.disabled"
                :model-value="getValue(field.name)"
                :placeholder="field.placeholder"
                @update:model-value="(val) => handleChange(field.name, val)"
                @blur="handleBlur(field.name)"
              />

              <NumberField
                v-else-if="field.type === 'number-field'"
                :id="field.name"
                :min="field.min"
                :max="field.max"
                :model-value="getValue(field.name)"
                :default-value="field.default || field.min || undefined"
                class="w-full"
                :disabled="field.disabled"
                @update:model-value="(val) => handleChange(field.name, val)"
                @blur="handleBlur(field.name)"
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
                :disabled="field.disabled"
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
                :disabled="field.disabled"
                @update:model-value="(val) => handleChange(field.name, val)"
                @blur="handleBlur(field.name)"
              />

              <TelInput
                v-else-if="field.type === 'tel'"
                :id="field.name"
                :placeholder="field.placeholder"
                :name="field.name"
                :disabled="field.disabled"
                :model-value="getValue(field.name)"
                @update:model-value="(val) => handleChange(field.name, val)"
                @blur="handleBlur(field.name)"
              />

              <InputURL
                v-else-if="field.type === 'url'"
                :id="field.name"
                :placeholder="field.placeholder"
                :name="field.name"
                :disabled="field.disabled"
                :model-value="getValue(field.name)"
                :hint="field.hint"
                @update:model-value="(val) => handleChange(field.name, val)"
                @blur="handleBlur(field.name)"
              />

              <SliderRange
                v-else-if="field.type === 'slider'"
                :id="field.name"
                :min="field.min"
                :max="field.max"
                :step="field.step"
                :model-value="getValue(field.name)"
                :step-ticks="field.stepTicks"
                @update:model-value="(val) => handleChange(field.name, val)"
                @blur="handleBlur(field.name)"
              />

              <FileInput
                v-else-if="field.type === 'file'"
                :id="field.name"
                :name="field.name"
                :disabled="field.disabled"
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
            </template>
          </template>
        </Field>
      </div>
    </template>
  </div>
</template>
