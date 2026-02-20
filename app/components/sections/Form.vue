<script lang="ts" setup>
import type { Field } from '~/registry/form/types'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import FormBuilder from '~/registry/form/FormBuilder.vue'
import { useForm } from '~/registry/form/useForm'

const userSchemaZod = z.object({
  role: z.enum(['client', 'guess']),
  email: z.email(),
  name: z.string(),
  password: z.string().min(8),
  isAdmin: z.boolean(),
  products: z.string().optional(),
  address: z.string().max(100),
  height: z.number().min(50).max(250),
  age: z.number().min(1).max(100),
  verifyEmailAddress: z.boolean(),
  currency: z.string().optional(),
  phone: z.string().optional(),
  docs: z.any().optional(),
  income: z.array(z.number()),
  url: z.string().url().optional(),
  gender: z.enum(['male', 'female', 'other']),
  birthday: z.string().optional(),
  customField: z.string().optional(),
})

const formZod = useForm(userSchemaZod, {
  name: 'Zod Form',
  initialValues: {
    isAdmin: false,
    income: [100, 500],
    gender: 'male',
    address: '',
    name: '',
    email: '',
    password: '',
    height: 170,
    age: 18,
    verifyEmailAddress: false,
    role: 'client',
  },
  mode: 'change',
  onSubmit: async (data) => {
    console.warn('Zod Data:', data)
  },
})

const formShape: Field[] = [{
  type: 'fieldset',
  name: 'personal_info',
  label: 'Personal Information',
  orientation: 'vertical',
  fields: [
    {
      orientation: 'vertical',
      type: 'text',
      label: 'Name',
      name: 'name',
      placeholder: 'Dano León',
    },
    {
      orientation: 'vertical',
      type: 'email',
      label: 'Email',
      name: 'email',
      placeholder: 'danoleon@gmail.com',
    },
    {
      orientation: 'vertical',
      type: 'radio-group',
      label: 'Gender',
      name: 'gender',
      options: [
        { title: 'Male', value: 'male' },
        { title: 'Female', value: 'female' },
        { title: 'Other', value: 'other' },
      ],
    },
    {
      orientation: 'vertical',
      type: 'date',
      label: 'Birthday',
      name: 'birthday',
      placeholder: 'Select your birthday',
    },
  ],
}, {
  orientation: 'vertical',
  type: 'select',
  name: 'role',
  label: 'Mi selección',
  options: ['client', 'guess'],
  placeholder: 'Label option',
}, {
  orientation: 'vertical',
  type: 'password',
  label: 'Password',
  name: 'password',
  placeholder: '********',
}, {
  orientation: 'vertical',
  type: 'async-select',
  label: 'Productos',
  url: 'https://dummyjson.com/products',
  k: 'id',
  v: 'title',
  name: 'products',
  sourceKey: 'products',
}, {
  orientation: 'vertical',
  type: 'number-field',
  label: 'Age',
  name: 'age',
  min: 1,
  max: 100,
  default: 18,
}, {
  orientation: 'vertical',
  type: 'numeric',
  label: 'Height',
  name: 'height',
  step: 1,
  min: 50,
  max: 250,
}, {
  orientation: 'vertical',
  type: 'currency',
  label: 'Country currency',
  name: 'currency',
  lang: 'us-US',
  config: {
    placeholder: 'Select a currency',
    searchPlaceholder: 'Search a currency',
    emptyState: 'No currencies available',
  },
}, {
  orientation: 'vertical',
  type: 'tel',
  label: 'Phone',
  name: 'phone',
}, {
  type: 'url',
  hint: 'Dont type protocol, only pathname.',
  label: 'Website URL',
  name: 'url',
  orientation: 'vertical',
}, {
  orientation: 'vertical',
  type: 'slider',
  label: 'Income range',
  name: 'income',
  min: 0,
  max: 1200,
  step: 100,
  stepTicks: true,
}, {
  orientation: 'horizontal',
  type: 'checkbox',
  label: 'Is Admin?',
  name: 'isAdmin',
}, {
  orientation: 'horizontal',
  type: 'switch',
  label: 'Verify email address',
  name: 'verifyEmailAddress',
}, {
  orientation: 'vertical',
  type: 'custom',
  label: 'Custom Field with Slot',
  name: 'customField',
  slotName: 'my-custom-slot',
}, {
  orientation: 'vertical',
  type: 'textarea',
  label: 'Address',
  name: 'address',
  placeholder: 'Personal address',
  wrapperClass: 'col-span-2',
}, {
  orientation: 'vertical',
  type: 'file',
  label: 'Documents',
  name: 'docs',
  accept: ['image/*'],
  wrapperClass: 'col-span-2',
}]
</script>

<template>
  <PartialsSection id="#form-manager" component-name="form" description="Composable generar y validar formularios" title="useForm + Form" :registry-dependencies="[]">
    <template #example>
      <FormBuilder :form="formZod" :fields="formShape" form-class="grid grid-cols-2 gap-6">
        <template #my-custom-slot="{ field, form }">
          <div class="border p-4 rounded-lg bg-muted/50 border-dashed border-primary/50">
            <Label :for="field.name" class="text-xs font-bold uppercase text-primary mb-2 block">{{ field.label }}</Label>
            <Input
              :id="field.name"
              :name="field.name"
              class="w-full bg-transparent outline-none border-b border-primary/20 focus:border-primary transition-colors pb-1"
              :value="form.fields.value[field.name]"
              placeholder="Type here..."
              @input="(e: Event) => form.setFieldValue(field.name, (e.target as HTMLInputElement).value)"
            />
          </div>
        </template>
        <template #actions>
          <Button type="button" variant="secondary" @click="formZod.handleSubmit">
            Other Button
          </Button>
        </template>
      </FormBuilder>
    </template>
  </PartialsSection>
</template>
