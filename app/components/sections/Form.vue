<script lang="ts" setup>
import type { Field } from '~/registry/form/types'
import { z } from 'zod'
import FormBuilder from '~/registry/form/FormBuilder.vue'
import { useForm } from '~/registry/form/useForm'

const userSchemaZod = z.object({
  role: z.enum(['client', 'guess']),
  email: z.email(),
  name: z.string(),
  password: z.string().min(8),
  isAdmin: z.boolean(),
  products: z.string(),
  adress: z.string().max(100),
  height: z.number().min(50).max(250),
  age: z.number().min(1).max(100),
})

const formZod = useForm(userSchemaZod, {
  name: 'Zod Form',
  initialValues: {
    isAdmin: false,
  },
  mode: 'change',
  onSubmit: async (data) => {
    console.warn('Zod Data:', data)
  },
})

const formShape: Field[] = [{
  type: 'select',
  name: 'role',
  label: 'Mi selección',
  options: ['client', 'guess'],
  placeholder: 'Label option',
}, {
  type: 'text',
  label: 'Name',
  name: 'name',
  placeholder: 'Dano León',
}, {
  type: 'email',
  label: 'Email',
  name: 'email',
  placeholder: 'danoleon@gmail.com',
}, {
  type: 'password',
  label: 'Password',
  name: 'password',
  placeholder: '********',
}, {
  type: 'async-select',
  label: 'Productos',
  url: 'https://dummyjson.com/products',
  k: 'id',
  v: 'title',
  name: 'products',
  sourceKey: 'products',
}, {
  type: 'number-field',
  label: 'Age',
  name: 'age',
  min: 1,
  max: 100,
  default: 18,
}, {
  type: 'numeric',
  label: 'Height',
  name: 'height',
  step: 1,
  min: 50,
  max: 250,
}, {
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
  type: 'tel',
  label: 'Phone',
  name: 'phone',
}, {
  type: 'checkbox',
  label: 'Is Admin?',
  name: 'isAdmin',
}, {
  type: 'textarea',
  label: 'Address',
  name: 'address',
  placeholder: 'Personal adress',
}, {
  type: 'file',
  label: 'Documents',
  name: 'docs',
  accept: ['image/*'],
}]
</script>

<template>
  <PartialsSection id="#form-manager" component-name="useForm" description="Composable para manejar formularios" title="useForm" :registry-dependencies="[]">
    <template #example>
      <FormBuilder :form="formZod" :fields="formShape">
        <template #actions>
          <Button type="button" variant="secondary" @click="formZod.handleSubmit">
            Other Button
          </Button>
        </template>
      </FormBuilder>
    </template>
  </PartialsSection>
</template>
